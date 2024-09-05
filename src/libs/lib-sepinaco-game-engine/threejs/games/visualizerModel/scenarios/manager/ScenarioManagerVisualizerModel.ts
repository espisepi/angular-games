import { LoadingManager } from "../../../../engine/loading/manager/LoadingManager";
import { Scenario } from "../../../../engine/scenarios/core/Scenario";
import { ScenarioManager } from "../../../../engine/scenarios/manager/ScenarioManager";
import { UpdatablesManager } from "../../../../engine/updatables/UpdatablesManager";
import { GraphicsWorld } from "../../../../engine/world/graphicsWorld/GraphicsWorld";
import { ScenarioVisualizerModel } from "../features/ScenarioVisualizerModel";




export class ScenarioManagerVisualizerModel extends ScenarioManager {

  constructor(graphicsWorld: GraphicsWorld, updatablesManager: UpdatablesManager, loadingManager: LoadingManager) {
    super(graphicsWorld, updatablesManager, loadingManager);
  }

  protected override createScenario(): Scenario {
    return new ScenarioVisualizerModel(this.getGraphicsWorld(),this.getUpdatablesManager(), this.getLoadingManager());
  }

}
