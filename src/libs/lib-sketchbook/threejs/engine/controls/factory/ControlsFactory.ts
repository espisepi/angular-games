// src/controls/ControlsFactory.ts
import * as THREE from 'three';
import { OrbitControl } from '../components/OrbitControls';
import { AbstractControl } from '../core/AbstractControls';
// Importa otras implementaciones de controles cuando sea necesario

export class ControlsFactory {
    static createControl(type: string, camera: THREE.Camera, renderer: THREE.WebGLRenderer): AbstractControl {
        switch(type) {
            case 'orbit':
                return new OrbitControl(camera, renderer);
            // Añade otros casos para diferentes tipos de controles
            default:
                throw new Error(`Control type "${type}" is not recognized.`);
        }
    }
}
