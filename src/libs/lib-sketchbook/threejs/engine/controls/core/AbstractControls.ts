// src/controls/AbstractControl.ts
import * as THREE from 'three';
import { TypeControls } from '../enums/TypeControls';

export abstract class AbstractControl {
    protected camera: THREE.Camera;
    protected domElement: HTMLElement;


    constructor(camera: THREE.Camera, domElement: HTMLElement) {
        this.camera = camera;
        this.domElement = domElement;
    }

    abstract getType(): TypeControls;

    abstract enable(): void;
    abstract disable(): void;
    abstract update(): void;
    abstract dispose(): void;
}
