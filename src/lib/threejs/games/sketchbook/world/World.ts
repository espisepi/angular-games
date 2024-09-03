import * as THREE from 'three';
import { IUpdatable } from '../../../engine/interfaces/IUpdatable';
import { InputManager } from '../../../engine/core/InputManager';
import { CameraOperator } from '../../../engine/core/CameraOperator';
import { WorldEngine } from '../../../engine/world/WorldEngine';



export class World extends WorldEngine {

  public mesh: THREE.Mesh;

  constructor(parent: HTMLElement) {

    super(parent);

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
