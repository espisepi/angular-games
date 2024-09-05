import * as THREE from 'three';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { ScenarioManager } from '../../../engine/scenarios/manager/ScenarioManager';
import { ScenarioManagerVisualizerModel } from '../scenarios/manager/ScenarioManagerVisualizerModel';

export class WorldVisualizerModel extends WorldEngine {
  constructor(params: IWorldEngineParams) {
    super(params as IWorldEngineParams);
  }

  // public override update(timeStep: number, unscaledTimeStep: number): void {
  //   super.update(timeStep, unscaledTimeStep);
  // }

  protected override createScenarioManager(): ScenarioManager | null {
    const updatablesManager = this.getUpdatablesManager();
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();

    if (updatablesManager && loadingManager) {
      return new ScenarioManagerVisualizerModel(
        graphicsManager,
        updatablesManager,
        loadingManager
      );
    }
    return null;
  }
}
