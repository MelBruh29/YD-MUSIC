import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { NavController } from '@ionic/angular';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [CommonModule, IonicModule]
})
export class IntroPage implements OnInit {
  constructor(
    private navCtrl: NavController,
    private storageService: StorageService
  ) {}

  ngOnInit() {}

async finalizarIntro() {
  await this.storageService.set('intro_visto', true);
  this.navCtrl.navigateRoot('/login'); // Luego del intro va al login
}
}