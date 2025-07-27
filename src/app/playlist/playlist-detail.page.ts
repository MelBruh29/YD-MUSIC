import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonItem,
  IonNote,
  IonIcon
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-playlist-detail',
  templateUrl: './playlist-detail.page.html',
  styleUrls: ['./playlist-detail.page.scss'],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [
    IonicModule,   // Esto importa todos los componentes de Ionic (ion-button, ion-label, etc.)
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonItem,
    IonNote,
    IonIcon
  ]
})
export class PlaylistDetailPage {
  playlistName = 'Mi Playlist';
  songs = [
    { title: 'Canción 1', artist: 'Artista 1', duration: '3:45' },
    { title: 'Canción 2', artist: 'Artista 2', duration: '4:05' }
  ];
}