import { GraphicsWorld } from '../../world/graphicsWorld/GraphicsWorld';
import { UpdatablesManager } from '../../updatables/UpdatablesManager';
import { IUpdatable } from '../../interfaces/IUpdatable';
import { Scenario } from '../core/Scenario';


// TODO: Hacer los scenarios o cambios de escenas y tener en cuenta el dispose de los objetos: https://threejs.org/manual/#en/cleanup
// TODO: Seguir la misma arquitectura que con controls: manager, factory, features
// https://threejs.org/manual/#en/cleanup
// Resumen:
// boxGeometry.dispose();
// boxTexture.dispose();
// boxMaterial.dispose();
// No quiero hacer IUpdatable a ScenarioManager
// porque quiero hacer IUpdatables
export class ScenarioManager {

  private graphicsWorld: GraphicsWorld;
  private updatablesManager: UpdatablesManager;

  private currentScenario: Scenario;

  constructor(graphicsWorld: GraphicsWorld, updatablesManager: UpdatablesManager) {
    this.graphicsWorld = graphicsWorld;
    this.updatablesManager = updatablesManager;

    this.currentScenario = new Scenario(graphicsWorld,updatablesManager);
  }

  // loadScene(loadingManager: LoadingManager, gltf: any): void;
  // launchScenario(scenarioID: string, loadingManager?: LoadingManager): void;
  // restartScenario(): void;



}
