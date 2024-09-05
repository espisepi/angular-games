import { LoadingManager } from './../../loading/manager/LoadingManager';
import { GraphicsManager } from '../../graphics/GraphicsManager';
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
  private graphicsManager: GraphicsManager;
  private updatablesManager: UpdatablesManager;
  private loadingManager: LoadingManager;

  private currentScenario: Scenario;

  constructor(
    graphicsManager: GraphicsManager,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    this.graphicsManager = graphicsManager;
    this.updatablesManager = updatablesManager;
    this.loadingManager = loadingManager;

    this.currentScenario = this.createScenario();
  }

  // override this method to use custom Scenario
  protected createScenario(): Scenario {
    return new Scenario(
      this.graphicsManager,
      this.updatablesManager,
      this.loadingManager
    );
  }

  // loadScene(loadingManager: LoadingManager, gltf: any): void;
  // launchScenario(scenarioID: string, loadingManager?: LoadingManager): void;
  // restartScenario(): void;

  // Public methods ===========================

  public getGraphicsWorld(): GraphicsManager {
    return this.graphicsManager;
  }

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }

  public getLoadingManager(): LoadingManager {
    return this.loadingManager;
  }
}
