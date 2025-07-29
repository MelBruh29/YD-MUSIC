import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd, RouterLink, RouterOutlet } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { StorageService } from './services/storage.service';
import { discOutline } from 'ionicons/icons';

// Ionic
import {
  IonApp,
  IonRouterOutlet,
  IonSplitPane,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenuToggle
} from '@ionic/angular/standalone';

import { NavbarComponent } from './components/navbar/navbar.component';

// Iconos
import { addIcons } from 'ionicons';
import { homeOutline, peopleOutline, informationCircleOutline, searchOutline, logInOutline } from 'ionicons/icons';
addIcons({ homeOutline, peopleOutline, informationCircleOutline, searchOutline, logInOutline, discOutline });

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    IonApp,
    IonRouterOutlet,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
    IonMenuToggle,
    NavbarComponent
  ],
})
export class AppComponent implements OnInit {
  isIntroPage = false;
  isLoginPage = false;
  isRegisterPage = false;

  public appPages = [
  { title: 'Home', url: '/home', icon: 'home-outline' },
  { title: 'Álbumes', url: '/albums', icon: 'albums-outline' },
  { title: 'Login', url: '/login', icon: 'log-in-outline' },
];


  constructor(
    private router: Router,
    private storageService: StorageService
    
  ) {
    addIcons({ homeOutline, peopleOutline, informationCircleOutline, searchOutline, logInOutline });

    // Detectar cambios de ruta para ocultar menú en intro/login/register
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const url = event.urlAfterRedirects;
        this.isIntroPage = url.startsWith('/intro');
        this.isLoginPage = url.startsWith('/login');
        this.isRegisterPage = url.startsWith('/register');
      }
    });
  }

  async ngOnInit() {
    await this.checkInitialRoute();
  }

  private async checkInitialRoute() {
    const introVisto = await this.storageService.get('intro_visto');
    const loggedIn = await this.storageService.get('logged_in');

    const current = this.router.url;

    // 1. No vio intro → siempre va a intro
    if (!introVisto) {
      if (!current.startsWith('/intro')) {
        this.router.navigateByUrl('/intro', { replaceUrl: true });
      }
      return;
    }

    // 2. Vio intro pero NO está logueado → login
    if (introVisto && !loggedIn) {
      if (!current.startsWith('/login') && !current.startsWith('/register')) {
        this.router.navigateByUrl('/login', { replaceUrl: true });
      }
      return;
    }

    // 3. Si ya vio intro y está logueado → sigue donde esté o home
    if (loggedIn && (current === '/' || current.startsWith('/intro') || current.startsWith('/login'))) {
      this.router.navigateByUrl('/home', { replaceUrl: true });
    }
    
  }
  
}
