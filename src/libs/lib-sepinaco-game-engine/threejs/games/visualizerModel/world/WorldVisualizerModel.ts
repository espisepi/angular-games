import * as THREE from 'three';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { ScenarioManager } from '../../../engine/scenarios/manager/ScenarioManager';
import { ScenarioManagerVisualizerModel } from '../scenarios/manager/ScenarioManagerVisualizerModel';

export class WorldVisualizerModel extends WorldEngine {
  constructor(params: IWorldEngineParams) {
    super(params as IWorldEngineParams);
  }

  public override update(timeStep: number, unscaledTimeStep: number): void {
    super.update(timeStep, unscaledTimeStep);
  }

  protected override createScenarioManager(): ScenarioManager | null {
    if (this.updatablesManager && this.loadingManager) {
      return new ScenarioManagerVisualizerModel(
        this.graphicsWorld,
        this.updatablesManager,
        this.loadingManager
      );
    }
    return null;
  }
}
