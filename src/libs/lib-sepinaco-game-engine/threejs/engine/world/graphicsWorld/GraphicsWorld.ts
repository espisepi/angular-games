import * as THREE from 'three';



export class GraphicsWorld {

  private scene: THREE.Scene;

  constructor() {
    this.scene = new THREE.Scene()
  }

  getScene(): THREE.Scene {
    return this.scene;
  }

  add(...object: THREE.Object3D[]): void {
    this.scene.add(...object);
  }

  remove(...object: THREE.Object3D[]): void {
    this.scene.remove(...object);
  }

}
