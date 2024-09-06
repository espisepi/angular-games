import * as THREE from 'three';
import { OrbitControl } from '../features/orbitControls/OrbitControls';
import { AbstractControl } from '../core/AbstractControls';
import { TypeControls } from '../enums/TypeControls';

export class ControlsFactory {
  static createControl(
    type: TypeControls,
    camera: THREE.Camera,
    domElement: HTMLElement
  ): AbstractControl {
    switch (type) {
      case TypeControls.Orbit:
        return new OrbitControl(camera, domElement);
      // Añade otros casos para diferentes tipos de controles
      default:
        throw new Error(`Control type "${type}" is not recognized.`);
    }
  }
}
