import * as THREE from 'three';
import { IUpdatable } from '../../../interfaces/IUpdatable';




export class BoxMesh extends THREE.Mesh implements IUpdatable {

  updateOrder: number = 99;

  constructor() {
    super(new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color('green')
      }));
  }

  update(timeStep: number, unscaledTimeStep: number): void {
    this.rotateY(0.1 * 5 * timeStep);
  }

  dispose(): void {
    this.geometry.dispose();
  }
}
