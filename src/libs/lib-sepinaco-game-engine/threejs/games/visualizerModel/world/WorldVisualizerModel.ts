import * as THREE from 'three';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineOptions } from '../../../engine/interfaces/IWorldEngineOptions';

export class WorldVisualizerModel extends WorldEngine {


  public mesh: THREE.Mesh;

  constructor(options: IWorldEngineOptions) {

    super(options as IWorldEngineOptions);

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
    // TODO: Poner bien las rutas de archivo (fijarse en yuka dive)
	this.loadingManager?.loadGLTF('/assets/models/boxman.glb', (gltf: any) =>
			{
				// this.loadScene(loadingManager, gltf);
        console.log("OYEEE GLTF: ", gltf);
        this.graphicsWorld.add(gltf.scene);
			}
		);
 }



}
