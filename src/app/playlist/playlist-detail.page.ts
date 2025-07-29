import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MusicService, Track, Artist } from '../services/music.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule]
})
export class PlaylistDetailPage implements OnInit, OnDestroy {
  artistId: string | null = null;
  artistName: string = '';
  tracks: Track[] = [];
  loading = true;

  // ✅ REPRODUCTOR - Variables agregadas
  currentTrack?: Track;
  audio?: HTMLAudioElement;
  isPlaying = false;
  progress = 0;
  progressInterval?: any;

  // ✅ FAVORITOS - Variables agregadas
  favorites: Track[] = [];

  constructor(
    private route: ActivatedRoute,
    private music: MusicService,
    private navCtrl: NavController,
    private storage: StorageService,
    private toastCtrl: ToastController
  ) {}

  async ngOnInit() {
    // Cargar favoritos al inicializar
    await this.loadFavorites();
    
    this.artistId = this.route.snapshot.paramMap.get('id');

    if (this.artistId) {
      // Obtener el nombre del artista
      this.music.getArtist(this.artistId).subscribe({
        next: (artist: Artist) => {
          this.artistName = artist.name;
        },
        error: () => {
          this.artistName = 'Artista desconocido';
        }
      });

      // Obtener sus canciones
      this.music.getTracksByArtist(this.artistId).subscribe({
        next: (tracks: Track[]) => {
          this.tracks = tracks;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error al obtener canciones del artista', err);
          this.loading = false;
        }
      });
    }
  }

  ngOnDestroy() {
    // ✅ Limpiar audio y timer al salir
    if (this.audio) {
      this.audio.pause();
    }
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  // ✅ REPRODUCTOR - Métodos agregados
  playTrack(track: Track) {
    if (!track.preview_url) {
      this.presentToast('Esta canción no tiene preview disponible 😢');
      return;
    }

    // Parar audio anterior si existe
    if (this.audio) {
      this.audio.pause();
      clearInterval(this.progressInterval);
    }

    this.currentTrack = track;
    this.audio = new Audio(track.preview_url);
    
    // Reproducir
    this.audio.play().then(() => {
      this.isPlaying = true;
      this.presentToast(`▶ Reproduciendo: ${track.name}`);
    }).catch((error) => {
      console.error('Error al reproducir:', error);
      this.presentToast('Error al reproducir la canción');
    });

    // Actualizar progreso
    this.progressInterval = setInterval(() => {
      if (this.audio && this.audio.duration > 0) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      }
    }, 500);

    // Cuando termine la canción
    this.audio.onended = () => {
      this.isPlaying = false;
      this.progress = 0;
      clearInterval(this.progressInterval);
    };
  }

  togglePlayPause() {
    if (!this.audio) return;
    
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    } else {
      this.audio.play().then(() => {
        this.isPlaying = true;
      }).catch((error) => {
        console.error('Error al reanudar:', error);
      });
    }
  }

  stopTrack() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.progress = 0;
      clearInterval(this.progressInterval);
      this.currentTrack = undefined;
    }
  }

  // ✅ FAVORITOS - Métodos agregados
  async loadFavorites() {
    const saved = await this.storage.get('favorites');
    this.favorites = saved || [];
  }

  async toggleFavorite(track: Track) {
    const idx = this.favorites.findIndex(t => t.id === track.id);
    if (idx >= 0) {
      this.favorites.splice(idx, 1);
      this.presentToast('❤️ Eliminado de favoritos');
    } else {
      this.favorites.push(track);
      this.presentToast('💖 Agregado a favoritos');
    }
    await this.storage.set('favorites', this.favorites);
  }

  isFavorite(track: Track): boolean {
    return this.favorites.some(t => t.id === track.id);
  }

  // ✅ UTILIDADES
  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  goBack() {
    // Parar música al regresar
    this.stopTrack();
    this.navCtrl.back();
  }
}