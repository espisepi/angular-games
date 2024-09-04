import * as THREE from 'three';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineOptions } from '../../../engine/interfaces/IWorldEngineOptions';


export class WorldVisualizerModel extends WorldEngine {


  public mesh: THREE.Mesh;

  constructor(options: IWorldEngineOptions) {

    super(options as IWorldEngineOptions);


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
