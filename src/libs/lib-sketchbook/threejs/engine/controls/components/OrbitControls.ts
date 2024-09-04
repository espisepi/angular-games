// src/controls/OrbitControl.ts
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AbstractControl } from '../core/AbstractControls';

export class OrbitControl extends AbstractControl {
    private control: OrbitControls;

    constructor(camera: THREE.Camera, domElement: HTMLElement) {
        super(camera, domElement);
        this.control = new OrbitControls(camera, domElement);
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
}
