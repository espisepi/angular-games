import * as THREE from 'three';
import { Scenario } from "../../../../engine/scenarios/core/Scenario";
import { UpdatablesManager } from "../../../../engine/updatables/UpdatablesManager";
import { GraphicsWorld } from "../../../../engine/world/graphicsWorld/GraphicsWorld";
import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';



export class ScenarioVisualizerModel extends Scenario {

  constructor(graphicsWorld: GraphicsWorld, updatablesManager: UpdatablesManager, loadingManager: LoadingManager)
	{
    super(graphicsWorld,updatablesManager, loadingManager);
  }

  // My lights for this Scenario
  protected override initLights(): void {
    super.initLights();
    // new light
    const light = new THREE.PointLight(0xff0000);
    this.getGraphicsWorld().add(light);
  }

  // My objects for this Scenario
  protected override initObjects(): void {
    // Load GLTF
    this.loadGLTF();
  }

// TODO: Hacer los scenarios o cambios de escenas y tener en cuenta el dispose de los objetos: https://threejs.org/manual/#en/cleanup
// https://threejs.org/manual/#en/cleanup
// Resumen:
// boxGeometry.dispose();
// boxTexture.dispose();
// boxMaterial.dispose();
 private loadGLTF(): void {
  if(!this.getLoadingManager()) return;
  this.getLoadingManager().onFinishedCallback = () =>
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
	this.getLoadingManager()?.loadGLTF('/assets/models/boxman.glb', (gltf: any) =>
			{
				// this.loadScene(loadingManager, gltf);
        console.log("OYEEE GLTF: ", gltf);
        this.getGraphicsWorld().add(gltf.scene);
			}
		);
 }




}
