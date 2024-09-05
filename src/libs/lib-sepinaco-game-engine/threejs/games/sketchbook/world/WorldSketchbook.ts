import * as THREE from 'three';
import { IUpdatable } from '../../../engine/interfaces/IUpdatable';
import { InputManager } from '../controls/InputManager';
import { CameraOperator } from '../controls/CameraOperator';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { IWorldSketchbookParams } from '../interfaces/IWorldSketchbookParams';
import { ScenarioManager } from '../../../engine/scenarios/manager/ScenarioManager';
import { ScenarioManagerSketchbook } from '../scenarios/manager/ScenarioManagerSketchbook';

export class WorldSketchbook extends WorldEngine {
  public inputManager?: InputManager;
  public cameraOperator?: CameraOperator;

  constructor(params: IWorldSketchbookParams) {
    super(params as IWorldEngineParams);

    if (this.updatablesManager) {
      this.inputManager = new InputManager(
        this.updatablesManager,
        this.rendererEngine.renderer.domElement
      );
      this.cameraOperator = new CameraOperator(
        this.updatablesManager,
        this.inputManager,
        this.camera,
        this.params.Mouse_Sensitivity
      );
    }
  }

  // public override update(timeStep: number, unscaledTimeStep: number): void {
  //   super.update(timeStep, unscaledTimeStep);
  // }

  protected override createScenarioManager(): ScenarioManager | null {
    if (this.updatablesManager && this.loadingManager) {
      return new ScenarioManagerSketchbook(
        this.graphicsWorld,
        this.updatablesManager,
        this.loadingManager
      );
    }
    return null;
  }
}
