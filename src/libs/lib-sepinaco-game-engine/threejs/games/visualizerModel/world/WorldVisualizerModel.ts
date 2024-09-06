import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { ScenarioManager } from '../../../engine/scenarios/manager/ScenarioManager';
import { ScenarioManagerVisualizerModel } from '../scenarios/manager/ScenarioManagerVisualizerModel';
import { PhysicsManager } from '../../../engine/physics/manager/PhysicsManager';

export class WorldVisualizerModel extends WorldEngine {
  constructor(params: IWorldEngineParams) {
    super(params as IWorldEngineParams);
  }

  protected override createScenarioManager(): ScenarioManager | null {
    const updatablesManager = this.getUpdatablesManager();
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();
    const physicsManager = this.getPhysicsManager();

    if (updatablesManager && loadingManager) {
      return new ScenarioManagerVisualizerModel(
        graphicsManager,
        physicsManager,
        updatablesManager,
        loadingManager
      );
    }
    return null;
  }
}
