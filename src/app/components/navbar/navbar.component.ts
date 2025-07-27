import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle, IonSearchbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonButtons,
    IonMenuButton,
    IonTitle,
    IonSearchbar
  ],
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  buscarHeroe(event: any) {
    const termino = event.detail.value;
    if (termino.trim() === '') {
      return;
    }
    this.router.navigate(['/buscar', termino]);
  }
}