// src/controls/AbstractControl.ts
import * as THREE from 'three';

export abstract class AbstractControl {
    protected camera: THREE.Camera;
    protected renderer: THREE.WebGLRenderer;

    constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
        this.camera = camera;
        this.renderer = renderer;
    }

    abstract enable(): void;
    abstract disable(): void;
    abstract update(): void;
}
