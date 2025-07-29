import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ToastController } from '@ionic/angular';
import { MusicService, Track } from '../../services/music.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule]
})
export class BusquedaComponent implements OnInit {
  searchResults: Track[] = [];
  tracks: Track[] = []; // ✅ Para compatibilidad con el HTML
  loading = false;
  searchTerm = '';
  termino = ''; // ✅ Propiedad que usa el HTML

  // Reproductor
  currentTrack?: Track;
  audio?: HTMLAudioElement;
  isPlaying = false;

  constructor(
    private musicService: MusicService,
    private toastCtrl: ToastController
  ) {}

  ngOnInit() {}

  onSearchInput(event: any) {
    const termino = event.target.value?.trim();
    this.termino = termino; // ✅ Actualizar la propiedad para el HTML
    if (termino && termino.length > 2) {
      this.searchTracks(termino);
    } else {
      this.searchResults = [];
      this.tracks = []; // ✅ Limpiar también tracks
    }
  }

  searchTracks(termino: string) {
    this.loading = true;
    this.musicService.searchTracks(termino).subscribe({
      next: (res: Track[]) => { // ✅ Tipado explícito
        this.searchResults = res;
        this.tracks = res; // ✅ Actualizar también tracks para el HTML
        this.loading = false;
      },
      error: (err: any) => { // ✅ Tipado explícito
        console.error('Error en búsqueda', err);
        this.loading = false;
        this.presentToast('Error al buscar canciones');
      }
    });
  }

  // ✅ Método actualizado para usar preview_url del Track
  playPreview(track: Track) {
    if (!track.preview_url) {
      this.presentToast('Esta canción no tiene preview disponible');
      return;
    }

    // Parar audio anterior si existe
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    this.currentTrack = track;
    this.audio = new Audio(track.preview_url);
    this.audio.play();
    this.isPlaying = true;

    this.audio.onended = () => {
      this.isPlaying = false;
      this.currentTrack = undefined;
    };
  }

  stopPreview() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
      this.isPlaying = false;
      this.currentTrack = undefined;
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 2000,
      position: 'bottom'
    });
    toast.present();
  }

  // Método para obtener imagen por defecto si no existe
  getTrackImage(track: Track): string {
    return track.image || 'assets/img/logo2.PNG';
  }
}