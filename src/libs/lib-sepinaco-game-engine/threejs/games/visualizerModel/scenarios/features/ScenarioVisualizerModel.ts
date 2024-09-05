import * as THREE from 'three';
import { Scenario } from '../../../../engine/scenarios/core/Scenario';
import { UpdatablesManager } from '../../../../engine/updatables/UpdatablesManager';
import { GraphicsWorld } from '../../../../engine/world/graphicsWorld/GraphicsWorld';
import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';

export class ScenarioVisualizerModel extends Scenario {
  constructor(
    graphicsWorld: GraphicsWorld,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    super(graphicsWorld, updatablesManager, loadingManager);
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

  private loadGLTF(): void {
    if (!this.getLoadingManager()) return;
    this.getLoadingManager().onFinishedCallback = () => {
      console.log('finished loading gltf! :)');
    };
    this.getLoadingManager()?.loadGLTF(
      '/assets/models/boxman.glb',
      (gltf: any) => {
        // this.loadScene(loadingManager, gltf);
        console.log('OYEEE GLTF: ', gltf);
        this.getGraphicsWorld().add(gltf.scene);
      }
    );
  }
}




// Hacer los scenarios o cambios de escenas y tener en cuenta el dispose de los objetos: https://threejs.org/manual/#en/cleanup
// https://threejs.org/manual/#en/cleanup
// Resumen:
// boxGeometry.dispose();
// boxTexture.dispose();
// boxMaterial.dispose();
