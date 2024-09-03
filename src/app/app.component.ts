import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { World } from '../lib/threejs/games/sketchbook/world/World';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit  {
  title = 'angular-games';

  // Usa @ViewChild para obtener una referencia al elemento
  @ViewChild('divElement') divElement!: ElementRef;

  // Implementa AfterViewInit para acceder al elemento después de que la vista ha sido inicializada
  ngAfterViewInit() {
    // Aquí puedes acceder al elemento directamente
    console.log(this.divElement.nativeElement);

    // Ejemplo de cómo podrías manipular el elemento
    this.divElement.nativeElement.style.backgroundColor = 'yellow';

    const world = new World(this.divElement.nativeElement);
  }
}
