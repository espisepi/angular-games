import * as THREE from 'three';
import { Scenario } from '../../../../engine/scenarios/features/scenario/Scenario';
import { UpdatablesManager } from '../../../../engine/updatables/manager/UpdatablesManager';
import { GraphicsManager } from '../../../../engine/graphics/manager/GraphicsManager';
import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';

// TODO: Hacer los scenarios o cambios de escenas y tener en cuenta el dispose de los objetos: https://threejs.org/manual/#en/cleanup
// https://threejs.org/manual/#en/cleanup
// Resumen:
// boxGeometry.dispose();
// boxTexture.dispose();
// boxMaterial.dispose();

// TODO: Integrar aqui sketchbook leyendo el escenario tal y como se lee en el sketchbook original

export class ScenarioSketchbook extends Scenario {
  constructor(
    graphicsManager: GraphicsManager,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    super(graphicsManager, updatablesManager, loadingManager);
  }

  // My lights for this Scenario
  protected override initLights(): void {
    // init default lights
    super.initLights();

    // new light
    const light = new THREE.PointLight(0xff0000);
    this.getGraphicsManager().add(light);
  }

  // My objects for this Scenario
  protected override initObjects(): void {
    // init default object
    super.initObjects();

    // Load GLTF
    this.loadGLTF();
  }

  private loadGLTF(): void {
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();

    if (!loadingManager) return;

    loadingManager.onFinishedCallback = () => {
      console.log('finished loading manager! :)');
    };

    this.getLoadingManager()?.loadGLTF(
      '/assets/models/boxman.glb',
      (gltf: any) => {
        console.log('gltf loaded: ', gltf);
        graphicsManager.add(gltf.scene);
      }
    );
  }
}
