import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';
import { Scenario } from '../../../../engine/scenarios/features/scenario/Scenario';
import { ScenarioManager } from '../../../../engine/scenarios/manager/ScenarioManager';
import { UpdatablesManager } from '../../../../engine/updatables/manager/UpdatablesManager';
import { GraphicsManager } from '../../../../engine/graphics/manager/GraphicsManager';
import { ScenarioSketchbook } from '../features/ScenarioSketchbook';

export class ScenarioManagerSketchbook extends ScenarioManager {
  constructor(
    graphicsManager: GraphicsManager,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    super(graphicsManager, updatablesManager, loadingManager);
  }

  protected override createScenario(): Scenario {
    return new ScenarioSketchbook(
      this.getGraphicsWorld(),
      this.getUpdatablesManager(),
      this.getLoadingManager()
    );
  }
}
