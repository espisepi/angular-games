import * as THREE from 'three';
import { ControlsFactory } from '../factory/ControlsFactory';
import { AbstractControl } from '../core/AbstractControls';
import { TypeControls } from '../enums/TypeControls';

// Singletone Class
export class ControlsManager {

    private static instance: ControlsManager;
    private camera: THREE.Camera;
    private domElement: HTMLElement;
    private currentControl: AbstractControl | null = null;

    private currentType: TypeControls | null = null;


    // El constructor es privado para evitar la creación directa de la clase desde fuera.
    private constructor(camera: THREE.Camera, domElement: HTMLElement) {
        this.camera = camera;
        this.domElement = domElement;
    }


    // Método estático para obtener la única instancia de la clase (Singleton)
    // Inicialización de ControlsManager (solo la primera vez se debe pasar camera y renderer)
    // this.controlsManager =  ControlsManager.getInstance(this.camera, this.rendererEngine.renderer.domElement);
    public static getInstance(camera?: THREE.Camera, domElement?: HTMLElement): ControlsManager {
        if (!ControlsManager.instance) {
            if (!camera || !domElement) {
                throw new Error('Camera and Renderer must be provided for the first instantiation.');
            }
            ControlsManager.instance = new ControlsManager(camera, domElement);
        }
        return ControlsManager.instance;
    }


    public setControl(type: TypeControls): void {
        if(type === TypeControls.Orbit) {
          this.currentControl = ControlsFactory.createControl(TypeControls.Orbit, this.camera, this.domElement);
          this.currentControl.enable();
        } else {
          console.log('No implementado mas controles aun, solo orbit');
        }
        // if (!this.currentControl) {
        //     this.currentControl = ControlsFactory.createControl(TypeControls.Orbit, this.camera, this.domElement);
        //     this.currentControl.enable();
        // } else {
        //     console.log('Control already set and instantiated');
        // }
    }


    public update(): void {
        if (this.currentControl) {
            this.currentControl.update();
        }
    }
}
