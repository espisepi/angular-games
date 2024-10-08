// src/controls/OrbitControl.ts
import * as THREE from 'three';
import { OrbitControls as OrbitControlsImpl } from 'three/addons/controls/OrbitControls.js';
import { AbstractControl } from '../../core/AbstractControls';

export class OrbitControl extends AbstractControl {
  private control: OrbitControlsImpl;

  constructor(camera: THREE.Camera, domElement: HTMLElement) {
    super(camera, domElement);
    this.control = new OrbitControlsImpl(camera, domElement);
    this.control.enableDamping = true;
  }

  enable(): void {
    this.control.enabled = true;
  }

  disable(): void {
    this.control.enabled = false;
  }

  update(): void {
    this.control.update();
  }

  dispose(): void {
    this.control.dispose();
  }
}
