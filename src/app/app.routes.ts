import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { LoginPage } from './login/login.page'; // <-- importa login
import { HeroesComponent } from './components/heroes/heroes.component';
import { AboutComponent } from './components/about/about.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { PlaylistDetailPage } from './playlist/playlist-detail.page';
import { introGuard } from './guards/intro.guard';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/intro', pathMatch: 'full' },  // <-- Arranca con intro

  { 
    path: 'intro',
    loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage), },
  {path: 'register',loadComponent: () => import('./register/register.page').then(m => m.RegisterPage)},
  { path: 'login', component: LoginPage },
  { path: 'home', component: HomePage },
  { path: 'playlist-detail/:name', component: PlaylistDetailPage },
  { path: 'heroes', component: HeroesComponent },
  { path: 'about', component: AboutComponent },
  { path: 'buscar/:termino', component: BusquedaComponent },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },
  { path: '**', redirectTo: '/intro' },
  { path: 'register', loadComponent: () => import('./register/register.page').then( m => m.RegisterPage)},
  { path: '', redirectTo: '/intro', pathMatch: 'full' },
  { path: 'intro', loadComponent: () => import('./intro/intro.page').then(m => m.IntroPage) },
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },
  // Home y demás páginas protegidas
  { path: 'home', component: HomePage, canActivate: [AuthGuard] },
  { path: 'playlist-detail/:name', component: PlaylistDetailPage, canActivate: [AuthGuard] },
  
  { path: '**', redirectTo: '/intro' }
];

