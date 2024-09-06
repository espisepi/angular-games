import * as THREE from 'three';
import { Scenario } from '../../../../engine/scenarios/features/scenario/Scenario';
import { UpdatablesManager } from '../../../../engine/updatables/manager/UpdatablesManager';
import { GraphicsManager } from '../../../../engine/graphics/manager/GraphicsManager';
import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';
import { PhysicsManager } from '../../../../engine/physics/manager/PhysicsManager';
import { BoxMan } from '../prefabs/boxman/BoxMan';

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
    physicsManager: PhysicsManager | null | undefined,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    super(graphicsManager, physicsManager, updatablesManager, loadingManager);
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

    const graphicsManager = this.getGraphicsManager();
    const physicsManager = this.getPhysicsManager();
    const updatablesManager = this.getUpdatablesManager();
    const loadingManager = this.getLoadingManager();

    const boxMan = new BoxMan(loadingManager,updatablesManager,graphicsManager,physicsManager);

  }


}
