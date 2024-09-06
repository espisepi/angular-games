import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';
import { Scenario } from '../../../../engine/scenarios/features/scenario/Scenario';
import { ScenarioManager } from '../../../../engine/scenarios/manager/ScenarioManager';
import { UpdatablesManager } from '../../../../engine/updatables/manager/UpdatablesManager';
import { GraphicsManager } from '../../../../engine/graphics/manager/GraphicsManager';
import { ScenarioVisualizerModel } from '../features/ScenarioVisualizerModel';
import { PhysicsManager } from '../../../../engine/physics/manager/PhysicsManager';

export class ScenarioManagerVisualizerModel extends ScenarioManager {
  constructor(
    graphicsManager: GraphicsManager,
    physicsManager: PhysicsManager,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    super(graphicsManager, physicsManager, updatablesManager, loadingManager);
  }

  protected override createScenario(): Scenario {
    return new ScenarioVisualizerModel(
      this.getGraphicsWorld(),
      this.getUpdatablesManager(),
      this.getLoadingManager()
    );
  }
}
