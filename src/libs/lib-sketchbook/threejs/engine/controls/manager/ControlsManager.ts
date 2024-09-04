// src/managers/ControlsManager.ts
import * as THREE from 'three';
import { ControlsFactory } from '../factory/ControlsFactory';
import { AbstractControl } from '../core/AbstractControls';

export class ControlsManager {

    private static instance: ControlsManager;
    private camera: THREE.Camera;
    private renderer: THREE.WebGLRenderer;
    private currentControl: AbstractControl | null = null;


    // El constructor es privado para evitar la creación directa de la clase desde fuera.
    private constructor(camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
        this.camera = camera;
        this.renderer = renderer;
    }


    // Método estático para obtener la única instancia de la clase (Singleton)
    public static getInstance(camera?: THREE.Camera, renderer?: THREE.WebGLRenderer): ControlsManager {
        if (!ControlsManager.instance) {
            if (!camera || !renderer) {
                throw new Error('Camera and Renderer must be provided for the first instantiation.');
            }
            ControlsManager.instance = new ControlsManager(camera, renderer);
        }
        return ControlsManager.instance;
    }


    public setControl(type: string): void {
        if (!this.currentControl) {
            this.currentControl = ControlsFactory.createControl(type, this.camera, this.renderer);
            this.currentControl.enable();
        } else {
            console.log('Control already set and instantiated');
        }
    }


    public update(): void {
        if (this.currentControl) {
            this.currentControl.update();
        }
    }
}
