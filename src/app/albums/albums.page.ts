import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MusicService, Album } from '../services/music.service'; // ✅ Importación correcta

@Component({
  selector: 'app-albums',
  templateUrl: './albums.page.html',
  styleUrls: ['./albums.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [IonicModule, CommonModule]
})
export class AlbumsPage implements OnInit {
  albums: Album[] = []; // ✅ Declaración correcta del tipo

  constructor(private music: MusicService) {}

  ngOnInit() {
    this.loadAlbums();
  }

  loadAlbums() {
    this.music.getAlbums().subscribe({
      next: (res: Album[]) => this.albums = res, // ✅ Tipado explícito
      error: (err: any) => console.error('Error al obtener álbumes', err) // ✅ Tipado explícito
    });
  }
}
