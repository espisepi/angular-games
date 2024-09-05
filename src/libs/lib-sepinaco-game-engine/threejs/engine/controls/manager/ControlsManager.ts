import * as THREE from 'three';
import { ControlsFactory } from '../factory/ControlsFactory';
import { AbstractControl } from '../core/AbstractControls';
import { TypeControls } from '../enums/TypeControls';

// Singletone Class
export class ControlsManager {
  private camera: THREE.Camera;
  private domElement: HTMLElement;
  private currentControl: AbstractControl | null = null;

  private currentType: TypeControls | null = null;

  // El constructor es privado para evitar la creación directa de la clase desde fuera.
  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    this.camera = camera;
    this.domElement = domElement;
  }

  public setControl(type: TypeControls): void {
    // Comprobar si el type es el mismo que el currentType,
    // Si es el mismo no se hace nada
    // Si cambia, se hace this.controls.dispose(); y se crea un nuevo currentControls
    if (this.currentType === type) return;

    // Dispose del anterior controls
    if (this.currentControl) {
      this.currentControl.dispose();
    }

    // Instanciamos el nuevo controls
    this.currentType = type;
    this.currentControl = ControlsFactory.createControl(
      type,
      this.camera,
      this.domElement
    );
    this.currentControl.enable();
  }

  public update(): void {
    if (this.currentControl) {
      this.currentControl.update();
    }
  }
}
