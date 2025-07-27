import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonBackButton, IonButtons, IonImg } from '@ionic/angular/standalone';
import { Heroe } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonBackButton,
    IonButtons,
    IonImg
  ]
})
export class HeroeComponent implements OnInit {

  @Input() id: string | undefined; // Recibirá el parámetro de la ruta

  heroe: Heroe | undefined;

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router
  ) { }

  ngOnInit() {
    if (this.id) {
      const heroeId = parseInt(this.id, 10);
      this.heroe = this.heroesService.getHeroe(heroeId);
    }
  }

  regresar() {
    this.router.navigate(['/heroes']);
  }
}