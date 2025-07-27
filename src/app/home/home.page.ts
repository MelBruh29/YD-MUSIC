import { Component, OnInit } from '@angular/core';
import { NavController, IonicModule } from '@ionic/angular';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  standalone: true,
  imports: [CommonModule, IonicModule],
})
export class HomePage implements OnInit {
  colorClaro = 'var(--color-claro)';
  colorOscuro = 'var(--color-oscuro)';
  colorActual = this.colorOscuro;

  playlists = [
    { name: 'Top Hits', image: 'assets/img/logo2.PNG' },
    { name: 'Pop Hits', image: 'assets/img/logo2.PNG' },
    { name: 'Lo-Fi Chill', image: 'assets/img/logo2.PNG' },
    { name: 'Workout Mix', image: 'assets/img/logo2.PNG' },
  ];

  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {}


  async ngOnInit() {
  const introVisto = await this.storageService.get('intro_visto');
  const logged = await this.storageService.get('logged_in');

  if (!introVisto) {
    this.navCtrl.navigateRoot('/intro');
    return;
  }

  if (!logged) {
    this.navCtrl.navigateRoot('/login');
    return;
  }

  await this.loadStorageData();
  this.simularCargaDatos();
}


  goToPlaylist(playlist: any) {
    this.navCtrl.navigateForward(`/playlist-detail/${playlist.name}`);
  }

  async CambiarColor() {
    this.colorActual =
      this.colorActual === this.colorOscuro
        ? this.colorClaro
        : this.colorOscuro;

    // Guardar en storage
    await this.storageService.set('theme', this.colorActual);
    console.log('Tema Guardado: ', this.colorActual);
  }

  goToIntro() {
    this.navCtrl.navigateForward('/intro');
  }

  async loadStorageData() {
    const savedTheme = await this.storageService.get('theme');
    if (savedTheme) {
      this.colorActual = savedTheme;
    }
  }

  async simularCargaDatos() {
    const data = await this.obtenerDatosSimulados();
    console.log('DatosSimulados: ', data);
  }

  obtenerDatosSimulados() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(['Rock', 'Pop', 'Jazz']);
      }, 10000);
    });
  }
}
