import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, NavController, ModalController, ToastController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';
import { MusicService, Artist, Track } from '../services/music.service';
import { forkJoin } from 'rxjs';
import { IonButton, IonItem, IonLabel, IonRange } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule,
     IonicModule,
    CommonModule,
  ],
})
export class HomePage implements OnInit {
  // Tema
  colorClaro = '#f5f5f5';
  colorOscuro = '#121212';
  colorActual = this.colorOscuro;

  // Datos
  artists: Artist[] = [];
  topTracks: Track[] = [];
  loading = true;
  
  openArtist(artist: Artist) { // ✅ Parámetro correcto, no array
    this.navCtrl.navigateForward(`/playlist-detail/${artist.id}`);
  }

  // Reproductor
  currentTrack?: Track;
  audio?: HTMLAudioElement;
  isPlaying = false;
  progress = 0;
  progressInterval?: any;

  // Favoritos
  favorites: Track[] = [];

  constructor(
    private storage: StorageService,
    private music: MusicService,
    private navCtrl: NavController,
    private toastCtrl: ToastController
  ) {}
  
  async ngOnInit() {
    await this.loadStorageData();
    await this.loadFavorites();
    this.loadData();
  }
  
  // REFRESH (pull-to-refresh)
  onRefresh(event: any) {
    this.loadData();
    setTimeout(() => event.target.complete(), 1000);
  }

  // Carga desde API
  loadData() {
    this.loading = true;

    this.music.getArtists().subscribe({
      next: (artists: Artist[]) => { // ✅ Tipado explícito
        this.artists = artists;
        const firstIds = artists.slice(0, 5).map(a => a.id);
        forkJoin(firstIds.map(id => this.music.getTracksByArtist(id))).subscribe({
          next: (groups: Track[][]) => { // ✅ Tipado explícito
            // Aplana sin usar flat() (para evitar TS2550)
            this.topTracks = groups.reduce((acc, val) => acc.concat(val), []).slice(0, 10);
            this.loading = false;
          },
          error: (err: any) => { // ✅ Tipado explícito
            console.error('Error cargando tracks por artista', err);
            this.loading = false;
          }
        });
      },
      error: (err: any) => { // ✅ Tipado explícito
        console.error('Error cargando artistas', err);
        this.loading = false;
      }
    });
  }

  // Reproductor
  playTrack(track: Track) {
    if (!track.preview_url) {
      this.presentToast('Esta canción no tiene preview 😢');
      return;
    }

    if (this.audio) {
      this.audio.pause();
      clearInterval(this.progressInterval);
    }

    this.currentTrack = track;
    this.audio = new Audio(track.preview_url);
    this.audio.play();
    this.isPlaying = true;

    this.progressInterval = setInterval(() => {
      if (this.audio && this.audio.duration > 0) {
        this.progress = (this.audio.currentTime / this.audio.duration) * 100;
      }
    }, 500);

    this.audio.onended = () => {
      this.isPlaying = false;
      this.progress = 0;
    };
  }

  togglePlayPause() {
    if (!this.audio) return;
    if (this.isPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  // Tema
  async CambiarColor() {
    this.colorActual =
      this.colorActual === this.colorOscuro ? this.colorClaro : this.colorOscuro;
    await this.storage.set('theme', this.colorActual);
  }

  async loadStorageData() {
    const savedTheme = await this.storage.get('theme');
    if (savedTheme) this.colorActual = savedTheme;
  }

  // Favoritos
  async loadFavorites() {
    const saved = await this.storage.get('favorites');
    this.favorites = saved || [];
  }

  async toggleFavorite(track: Track) {
    const idx = this.favorites.findIndex(t => t.id === track.id);
    if (idx >= 0) {
      this.favorites.splice(idx, 1);
      this.presentToast('Eliminado de favoritos');
    } else {
      this.favorites.push(track);
      this.presentToast('Agregado a favoritos');
    }
    await this.storage.set('favorites', this.favorites);
  }

  isFavorite(track: Track) {
    return this.favorites.some(t => t.id === track.id);
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({ message, duration: 1200 });
    toast.present();
  }
}