import * as THREE from 'three';
import { IUpdatable } from '../../../engine/interfaces/IUpdatable';
import { InputManager } from '../controls/InputManager';
import { CameraOperator } from '../controls/CameraOperator';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { IWorldSketchbookParams } from '../interfaces/IWorldSketchbookParams';

export class WorldSketchbook extends WorldEngine {
  public inputManager?: InputManager;
  public cameraOperator?: CameraOperator;

  public mesh: THREE.Mesh;

  constructor(params: IWorldSketchbookParams) {
    super(params as IWorldEngineParams);

    if (this.updatablesManager) {
      this.inputManager = new InputManager(
        this.updatablesManager,
        this.rendererEngine.renderer.domElement
      );
      this.cameraOperator = new CameraOperator(
        this.updatablesManager,
        this.inputManager,
        this.camera,
        this.params.Mouse_Sensitivity
      );
    }

    // create mesh
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color('green'),
      })
    );
    this.graphicsWorld.add(this.mesh);
  }

  public override update(timeStep: number, unscaledTimeStep: number): void {
    super.update(timeStep, unscaledTimeStep);

    this.mesh?.rotateY(0.1 * 5 * timeStep);
  }

  // TODO: Hacer override de los managers
  // que he creado en sketchbook en vez de los del core
  // por medio de getters override en donde se devuelve la instancia del manager
}
