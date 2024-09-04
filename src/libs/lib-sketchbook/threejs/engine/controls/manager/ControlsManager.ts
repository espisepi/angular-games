// src/managers/ControlsManager.ts
import * as THREE from 'three';
import { ControlsFactory } from '../factory/ControlsFactory';
import { AbstractControl } from '../core/AbstractControls';

export class ControlsManager {
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private currentControl: AbstractControl | null = null;

    constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
        this.camera = camera;
        this.renderer = renderer;
    }

    setControl(type: string): void {
        if (this.currentControl) {
            this.currentControl.disable();
        }
        this.currentControl = ControlsFactory.createControl(type, this.camera, this.renderer);
        this.currentControl.enable();
    }

    update(): void {
        if (this.currentControl) {
            this.currentControl.update();
        }
    }
}
