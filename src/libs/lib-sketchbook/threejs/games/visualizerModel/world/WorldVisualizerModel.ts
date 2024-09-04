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


  /**
	 * Rendering loop.
	 * Implements fps limiter and frame-skipping
	 * Calls world's "update" function before rendering.
	 */
	public override render(): void
	{
    super.render();

    this.mesh?.rotateY(0.001 * 5);

  }



}
