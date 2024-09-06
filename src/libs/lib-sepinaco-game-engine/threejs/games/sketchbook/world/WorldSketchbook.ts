import { InputManager } from '../controls/InputManager';
import { CameraOperator } from '../controls/CameraOperator';
import { WorldEngine } from '../../../engine/world/WorldEngine';
import { IWorldEngineParams } from '../../../engine/interfaces/IWorldEngineParams';
import { IWorldSketchbookParams } from '../interfaces/IWorldSketchbookParams';
import { ScenarioManager } from '../../../engine/scenarios/manager/ScenarioManager';
import { ScenarioManagerSketchbook } from '../scenarios/manager/ScenarioManagerSketchbook';
import { GraphicsManager } from '../../../engine/graphics/GraphicsManager';

export class WorldSketchbook extends WorldEngine {
  public inputManager?: InputManager | null;
  public cameraOperator?: CameraOperator | null;

  constructor(params: IWorldSketchbookParams) {
    super(params as IWorldEngineParams);

    this.inputManager = this.createInputManager();
    this.cameraOperator = this.createCameraOperator();
  }

  private createInputManager(): InputManager | null {
    const updatablesManager = this.getUpdatablesManager();
    const rendererManager = this.getRendererManager();
    const renderer = rendererManager?.getRenderer();
    const domElement = renderer?.domElement;

    if (updatablesManager && domElement) {
      return new InputManager(updatablesManager, domElement);
    }
    return null;
  }

  private createCameraOperator(): CameraOperator | null {
    const updatablesManager = this.getUpdatablesManager();
    const cameraManager = this.getCameraManager();
    const camera = cameraManager.getCamera();
    const inputManager = this.getInputManager();
    const mouseSensivity = this.params.Mouse_Sensitivity;

    if (updatablesManager) {
      return new CameraOperator(
        updatablesManager,
        inputManager,
        camera,
        mouseSensivity
      );
    }
    return null;
  }

  // override methods to modify logic of parent class WorldEngine ================

  protected override createScenarioManager(): ScenarioManager | null {
    const updatablesManager = this.getUpdatablesManager();
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();

    if (updatablesManager && loadingManager) {
      return new ScenarioManagerSketchbook(
        graphicsManager,
        updatablesManager,
        loadingManager
      );
    }
    return null;
  }

  // public methods ==========================

  public getInputManager(): InputManager | null | undefined {
    return this.inputManager;
  }
}
