import { Injectable } from '@angular/core';
import { Heroe } from '../models/heroe.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private heroes: Heroe[] = [
    {
      nombre: 'Aquaman',
      bio: 'El principal deber de Aquaman ha sido proteger los vastos océanos del mundo, tanto de la contaminación como de los piratas o cualquier otra amenaza. También es el gobernante de Atlantis, el reino submarino. Es un poderoso héroe con una gran variedad de habilidades: telepatía con la vida marina, fuerza sobrehumana, reflejos, resistencia, durabilidad y un increíble talento para la natación.',
      img: 'assets/img/aquaman.png',
      aparicion: '1941-11-01',
      casa: 'DC'
    },
    {
      nombre: 'Batman',
      bio: 'Los padres de Bruce Wayne fueron asesinados frente a sus ojos cuando era niño. Este trauma lo llevó a una vida de lucha contra el crimen como el vigilante Batman. Aunque no tiene superpoderes, Batman es un maestro detective, un combatiente experto, y utiliza la tecnología más avanzada para combatir el crimen en Gotham City.',
      img: 'assets/img/batman.png',
      aparicion: '1939-05-01',
      casa: 'DC'
    },
    {
      nombre: 'Daredevil',
      bio: 'Matt Murdock fue cegado por un accidente con desechos radioactivos cuando era niño, lo que le dio sentidos sobrehumanos. Como adulto, usa sus habilidades para combatir el crimen como el vigilante Daredevil en Hell\'s Kitchen, Nueva York. Es un abogado de día y un justiciero de noche.',
      img: 'assets/img/daredevil.png',
      aparicion: '1964-04-01',
      casa: 'Marvel'
    },
    {
      nombre: 'Hulk',
      bio: 'Robert Bruce Banner, un científico brillante, se expuso accidentalmente a rayos gamma durante un experimento, transformándose en el increíble Hulk. Cuando se enfurece, Banner se convierte en una criatura gigante, verde y superpoderosa con una fuerza ilimitada. Lucha por controlar su ira y proteger a los inocentes.',
      img: 'assets/img/hulk.png',
      aparicion: '1962-05-01',
      casa: 'Marvel'
    },
    {
      nombre: 'Linterna Verde',
      bio: 'Hal Jordan, un piloto de pruebas, fue elegido por el anillo de poder de un extraterrestre moribundo para unirse al Cuerpo de Linternas Verdes, una fuerza intergaláctica de paz. El anillo le permite crear cualquier cosa que su imaginación pueda concebir con la fuerza de su voluntad. Es un héroe con una voluntad inquebrantable.',
      img: 'assets/img/linterna-verde.png',
      aparicion: '1940-07-01',
      casa: 'DC'
    },
    {
      nombre: 'Spider-Man',
      bio: 'Peter Parker era un estudiante de secundaria promedio que fue mordido por una araña radioactiva, otorgándole poderes arácnidos. Tras la trágica muerte de su tío, Peter aprende que "un gran poder conlleva una gran responsabilidad" y se convierte en el amigable vecino Spider-Man, un héroe que balancea la vida como adolescente con la lucha contra el crimen en Nueva York.',
      img: 'assets/img/spiderman.png',
      aparicion: '1962-08-01',
      casa: 'Marvel'
    },
    {
      nombre: 'Wolverine',
      bio: 'James Howlett, más conocido como Wolverine, es un mutante con garras retráctiles de adamantium, un factor de curación regenerativo y sentidos aumentados. Es un personaje rudo, con un pasado misterioso y una moral ambigua. Ha sido miembro de los X-Men y un antihéroe solitario.',
      img: 'assets/img/wolverine.png',
      aparicion: '1974-11-01',
      casa: 'Marvel'
    }
  ];

  constructor() {
    console.log('Servicio de héroes listo para usar!!!');
  }

  getHeroes(): Heroe[] {
    return [...this.heroes]; // Devolver una copia para evitar mutaciones directas
  }

  getHeroe(idx: number): Heroe | undefined {
    return this.heroes[idx];
  }

  buscarHeroes(termino: string): Heroe[] {
    let heroesArr: Heroe[] = [];
    termino = termino.toLowerCase();

    for (let i = 0; i < this.heroes.length; i++) {
      let heroe = { ...this.heroes[i] }; // Crear una copia del héroe
      const nombre = heroe.nombre.toLowerCase();

      if (nombre.indexOf(termino) >= 0) {
        heroe.idx = i; // Asignar el índice original
        heroesArr.push(heroe);
      }
    }
    return heroesArr;
  }
}