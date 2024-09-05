import * as THREE from 'three';
import { IUpdatable } from '../interfaces/IUpdatable';
import { IWorldEngineParams } from '../interfaces/IWorldEngineParams';
import { RendererManager } from '../renderer/RendererManager';
import { getElementHeight, getElementWidth } from '../utils/FunctionLibrary';
import { ControlsManager } from '../controls/manager/ControlsManager';
import { TypeControls } from '../controls/enums/TypeControls';
import { Stats } from '../features/stats/Stats';
import { UpdatablesManager } from '../updatables/UpdatablesManager';
import { LoadingManager } from '../loading/manager/LoadingManager';
import { GraphicsManager } from '../graphics/GraphicsManager';
import { ScenarioManager } from '../scenarios/manager/ScenarioManager';
import { CameraManager } from '../cameras/manager/CameraManager';

export class WorldEngine {

  public graphicsManager: GraphicsManager;

  public cameraManager: CameraManager;

  public controlsManager?: ControlsManager | null;

  public updatablesManager?: UpdatablesManager;

  public loadingManager?: LoadingManager;

  public rendererManager: RendererManager;

  private scenarioManager?: ScenarioManager | null;

  public parent: HTMLElement;

  stats?: Stats;

  public params: any = {
    Pointer_Lock: false,
    Mouse_Sensitivity: 0.3,
    Time_Scale: 1,
    // Shadows: true,
    // FXAA: true,
    // Debug_Physics: false,
    // Debug_FPS: false,
    // Sun_Elevation: 50,
    // Sun_Rotation: 145,
  };

  constructor(params: IWorldEngineParams) {
    const { parent } = params;
    const { typeControls } = params;
    const { hasStats = true } = params;

    this.parent = parent;

    const width = getElementWidth(parent);
    const height = getElementHeight(parent);

    // Create Graphics Manager (Threejs scene) (can be override by custom graphics manager)
    this.graphicsManager = this.createGraphicsManager();

    // Create Camera Manager (Threejs camera) (can be override by custom camera manager)
    this.cameraManager = this.createCameraManager(width, height);

    // Create Renderer Manager (Threejs renderer) (can be override by custom renderer manager)
    this.rendererManager = this.createRendererManager();

    // Create Loading Manager
    this.loadingManager = new LoadingManager();

    // Create Updatables Manager
    this.updatablesManager = new UpdatablesManager();

    //  Create Controls Manager (can be override by custom controls manager)
    this.controlsManager = this.createControlsManager(typeControls);

    //  Create Scenario Manager (can be override by custom scenario manager)
    this.scenarioManager = this.createScenarioManager();

    if (hasStats) {
      this.setupStats();
    }

    // Render call
    this.render();
  }

  // Override this method to use custom Scenario Manager
  protected createScenarioManager(): ScenarioManager | null {
    if (this.updatablesManager && this.loadingManager) {
      return new ScenarioManager(
        this.graphicsManager,
        this.updatablesManager,
        this.loadingManager
      );
    }
    return null;
  }

  // Override this method to use custom Camera Manager
  protected createCameraManager(width: number, height: number): CameraManager {
    return new CameraManager(width, height);
  }

  // Override this method to use custom Renderer Manager
  protected createRendererManager(): RendererManager {
    return new RendererManager(
      this.parent,
      this.cameraManager,
      this.graphicsManager
    );
  }

  // Override this method to use custom Graphics Manager
  protected createGraphicsManager(): GraphicsManager {
    return new GraphicsManager();
  }

  // Override this method to use custom Controls Manager
  protected createControlsManager(typeControls?: TypeControls): ControlsManager | null {
    if(!this.updatablesManager) return null;
    // Create controlsManager
    const controlsManager = new ControlsManager(
      this.cameraManager.getCamera(),
      this.rendererManager.getRenderer().domElement,
      this.updatablesManager
    );

    // Set controls
    if(typeControls) {
      controlsManager.setControl(typeControls);
    } else {
      // Si no se selecciona el type, no instanciamos ningun control
      // controlsManager.setControl(TypeControls.Orbit);
    }

    return controlsManager;
  }

  private setupStats(): void {
    this.stats = new Stats(this.updatablesManager);
  }


  /**
   * Rendering loop.
   * Implements fps limiter and frame-skipping
   * Calls world's "update" function before rendering.
   */
  public render(): void {
    requestAnimationFrame(() => {
      this.render();
    });

    // Update render RenderEngine
    const [timeStep, unscaledTimeStep] = this.rendererManager.render();

    // Logic
    this.update(timeStep, unscaledTimeStep);
  }

  // Update
  // Handles all logic updates.
  public update(timeStep: number, unscaledTimeStep: number): void {
    this.updatablesManager?.update(timeStep, unscaledTimeStep);
  }

}
