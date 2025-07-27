import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCardContent, IonImg, IonButton, IonGrid, IonRow, IonCol, IonNote } from '@ionic/angular/standalone';
import { Heroe } from '../../models/heroe.model';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonList,
    IonItem,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonCardContent,
    IonImg,
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonNote
  ]
})
export class BusquedaComponent implements OnInit {

  heroes: Heroe[] = [];
  termino: string = '';

  constructor(
    private heroesService: HeroesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.termino = params.get('termino') || '';
      if (this.termino.trim() !== '') {
        this.heroes = this.heroesService.buscarHeroes(this.termino);
      } else {
        this.heroes = [];
      }
    });
  }

  verHeroe(idx: number) {
    this.router.navigate(['/heroe', idx]);
  }
}
