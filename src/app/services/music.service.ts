import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Artist {
  id: string;
  name: string;
  image?: string;
}

export interface Track {
  id: string;
  name: string;
  album: string;
  url: string;
  artistId: string;
  preview_url?: string;
  image?: string;       
  duration?: string;    
}

export interface Album {
  id: string;
  name: string;
  image?: string;
  artist: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {
  private apiUrl = 'https://music.fly.dev';

  constructor(private http: HttpClient) {}
 
  // Método para obtener UN artista por su ID
  getArtist(id: string): Observable<Artist> {
    return this.http.get<Artist>(`${this.apiUrl}/artists/${id}`);
  }

  // Método para obtener canciones por artista
  getTracksByArtist(id: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/tracks?artistId=${id}`);
  }

  // Método para obtener todos los artistas
  getArtists(): Observable<Artist[]> {
    return this.http.get<Artist[]>(`${this.apiUrl}/artists`);
  }

  // ✅ Método agregado para obtener álbumes
  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(`${this.apiUrl}/albums`);
  }

  // ✅ Método agregado para búsqueda de tracks
  searchTracks(query: string): Observable<Track[]> {
    return this.http.get<Track[]>(`${this.apiUrl}/search/tracks?q=${encodeURIComponent(query)}`);
  }
}