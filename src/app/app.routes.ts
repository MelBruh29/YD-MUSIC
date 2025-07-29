import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { HeroesComponent } from './components/heroes/heroes.component';
import { AboutComponent } from './components/about/about.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PlaylistDetailPage } from './playlist/playlist-detail.page';

import { introGuard } from './guards/intro.guard';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  
  // Intro: solo si NO la has visto
  {
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage),
    canActivate: [introGuard],
  },
  
  // Login & Register: libres
  {
    path: 'login',
    loadComponent: () => import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.page').then(m => m.RegisterPage),
  },
  
  // Páginas protegidas (requieren estar logueado)
  { path: 'home', component: HomePage, canActivate: [authGuard] },
  
  // ✅ CAMBIO: usar :id en lugar de :name
  { path: 'playlist-detail/:id', component: PlaylistDetailPage, canActivate: [authGuard] },
  
  { path: 'heroes', component: HeroesComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent, canActivate: [authGuard] },
  { path: 'buscar/:termino', component: BusquedaComponent, canActivate: [authGuard] },
  {
    path: 'albums',
    loadComponent: () => import('./albums/albums.page').then(m => m.AlbumsPage),
    canActivate: [authGuard]
  },
  
  { path: '**', redirectTo: '/intro' },
];