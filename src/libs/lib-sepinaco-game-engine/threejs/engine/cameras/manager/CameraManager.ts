import * as THREE from 'three';
export class CameraManager {
  private width: number;
  private height: number;

  private camera: THREE.PerspectiveCamera;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;

    this.camera = this.createCamera();
  }

  // Override this method to use custom PerspectiveCamera
  protected createCamera(): THREE.PerspectiveCamera {
    const camera = new THREE.PerspectiveCamera(
      80,
      this.width / this.height,
      0.1,
      1010
    );
    camera.position.set(0, 0, 3);
    return camera;
  }

  // public methods ==========

  getCamera(): THREE.PerspectiveCamera {
    return this.camera;
  }
}
