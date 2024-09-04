import * as THREE from 'three';
import { IUpdatable } from '../../../engine/interfaces/IUpdatable';
import { InputManager } from '../controls/InputManager';
import { CameraOperator } from '../controls/CameraOperator';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineOptions } from '../../../engine/interfaces/IWorldEngineOptions';
import { IWorldSketchbookOptions } from '../interfaces/IWorldSketchbookOptions';



export class WorldSketchbook extends WorldEngine {

  public inputManager: InputManager;
  public cameraOperator: CameraOperator;

  public mesh: THREE.Mesh;

  constructor(options: IWorldSketchbookOptions) {

    super(options as IWorldEngineOptions);

    this.inputManager = new InputManager(this, this.rendererEngine.renderer.domElement);
    this.cameraOperator = new CameraOperator(this, this.camera, this.params.Mouse_Sensitivity);


    // create mesh
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color('green')
      })
    );
    this.graphicsWorld.add(this.mesh);

  }


  public override update(timeStep: number, unscaledTimeStep: number): void {
    super.update(timeStep, unscaledTimeStep);

    this.mesh?.rotateY(0.1 * 5 * timeStep);
  }




}
