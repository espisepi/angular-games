import { LoadingManager } from '../../../../engine/loading/manager/LoadingManager';
import { Scenario } from '../../../../engine/scenarios/core/Scenario';
import { ScenarioManager } from '../../../../engine/scenarios/manager/ScenarioManager';
import { UpdatablesManager } from '../../../../engine/updatables/UpdatablesManager';
import { GraphicsManager } from '../../../../engine/graphics/GraphicsManager';
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
