import * as THREE from 'three';
import { IUpdatable } from '../../../engine/interfaces/IUpdatable';
import { InputManager } from '../controls/InputManager';
import { CameraOperator } from '../controls/CameraOperator';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { IWorldSketchbookParams } from '../interfaces/IWorldSketchbookParams';
import { ScenarioManager } from '../../../engine/scenarios/manager/ScenarioManager';
import { ScenarioManagerSketchbook } from '../scenarios/manager/ScenarioManagerSketchbook';
import { UpdatablesManager } from '../../../engine/updatables/UpdatablesManager';

export class WorldSketchbook extends WorldEngine {
  public inputManager?: InputManager | null;
  public cameraOperator?: CameraOperator | null;

  constructor(params: IWorldSketchbookParams) {
    super(params as IWorldEngineParams);

    this.inputManager = this.createInputManager();
    this.cameraOperator = this.createCameraOperator();
  }

  private createInputManager(): InputManager | null {
    if (this.updatablesManager) {
      return new InputManager(
        this.updatablesManager,
        this.rendererManager.renderer.domElement
      );
    }
    return null;
  }

  private createCameraOperator(): CameraOperator | null {
    if (this.updatablesManager) {
      return new CameraOperator(
        this.updatablesManager,
        this.inputManager,
        this.camera,
        this.params.Mouse_Sensitivity
      );
    }
    return null;
  }

  // override methods to modify logic of parent class WorldEngine ================

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

  // public override update(timeStep: number, unscaledTimeStep: number): void {
  //   super.update(timeStep, unscaledTimeStep);
  // }
}
