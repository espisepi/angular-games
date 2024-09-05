import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { WorldSketchbook } from '../libs/lib-sepinaco-game-engine/threejs/games/sketchbook/world/WorldSketchbook';
import { IWorldSketchbookParams } from '../libs/lib-sepinaco-game-engine/threejs/games/sketchbook/interfaces/IWorldSketchbookParams';
import { IWorldEngineParams } from '../libs/lib-sepinaco-game-engine/threejs/engine/interfaces/IWorldEngineParams';
import { WorldVisualizerModel } from '../libs/lib-sepinaco-game-engine/threejs/games/visualizerModel/world/WorldVisualizerModel';
import { TypeControls } from '../libs/lib-sepinaco-game-engine/threejs/engine/controls/enums/TypeControls';

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

    // const params: IWorldSketchbookParams = {
    //   parent: this.divElement.nativeElement
    // }
    // const world = new WorldSketchbook(params);

    const params: IWorldEngineParams = {
      parent: this.divElement.nativeElement,
      typeControls: TypeControls.Orbit,
      hasStats: true
    }
    const world = new WorldVisualizerModel(params);

    // const sepinacoGameEngine = new SepinacoGameEngine(this.divElement.nativeElement);
  }
}
