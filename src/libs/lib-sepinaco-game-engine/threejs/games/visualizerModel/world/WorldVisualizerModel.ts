import * as THREE from 'three';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';

export class WorldVisualizerModel extends WorldEngine {


  public mesh: THREE.Mesh;

  constructor(params: IWorldEngineParams) {

    super(params as IWorldEngineParams);

    // light
    const light = new THREE.AmbientLight();
    this.graphicsWorld.add(light);

    // create mesh
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color('green')
      })
    );
    this.graphicsWorld.add(this.mesh);

    // Load GLTF
    this.loadGLTF();

  }


 public override update(timeStep: number, unscaledTimeStep: number): void {
  super.update(timeStep, unscaledTimeStep);

  this.mesh?.rotateY(0.1 * 5 * timeStep);

 }

// TODO: Hacer los scenarios o cambios de escenas y tener en cuenta el dispose de los objetos: https://threejs.org/manual/#en/cleanup
// https://threejs.org/manual/#en/cleanup
// Resumen:
// boxGeometry.dispose();
// boxTexture.dispose();
// boxMaterial.dispose();
 private loadGLTF(): void {
  if(!this.loadingManager) return;
  this.loadingManager.onFinishedCallback = () =>
		{
				// this.update(1, 1);
				// this.setTimeScale(1);

				// Swal.fire({
				// 	title: 'Welcome to Sketchbook!',
				// 	text: 'Feel free to explore the world and interact with available vehicles. There are also various scenarios ready to launch from the right panel.',
				// 	footer: '<a href="https://github.com/swift502/Sketchbook" target="_blank">GitHub page</a><a href="https://discord.gg/fGuEqCe" target="_blank">Discord server</a>',
				// 	confirmButtonText: 'Okay',
				// 	buttonsStyling: false,
				// 	onClose: () => {
				// 		UIManager.setUserInterfaceVisible(true);
				// 	}
				// });
		};
	this.loadingManager?.loadGLTF('/assets/models/boxman.glb', (gltf: any) =>
			{
				// this.loadScene(loadingManager, gltf);
        console.log("OYEEE GLTF: ", gltf);
        this.graphicsWorld.add(gltf.scene);
			}
		);
 }



}
