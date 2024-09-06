import { IWorldEngineParams } from '../interfaces/IWorldEngineParams';
import { RendererManager } from '../renderer/manager/RendererManager';
import { getElementHeight, getElementWidth } from '../utils/FunctionLibrary';
import { ControlsManager } from '../controls/manager/ControlsManager';
import { TypeControls } from '../controls/enums/TypeControls';
import { Stats } from '../features/stats/Stats';
import { UpdatablesManager } from '../updatables/manager/UpdatablesManager';
import { LoadingManager } from '../loading/manager/LoadingManager';
import { GraphicsManager } from '../graphics/manager/GraphicsManager';
import { ScenarioManager } from '../scenarios/manager/ScenarioManager';
import { CameraManager } from '../cameras/manager/CameraManager';
import { PhysicsManager } from '../physics/manager/PhysicsManager';
import { TypePhysics } from '../physics/enums/TypePhysics';

export class WorldEngine {
  private graphicsManager: GraphicsManager;

  private cameraManager: CameraManager;

  private controlsManager?: ControlsManager | null;

  private updatablesManager?: UpdatablesManager;

  private loadingManager?: LoadingManager;

  private rendererManager: RendererManager;

  private scenarioManager?: ScenarioManager | null;

  private physicsManager?: PhysicsManager | null | undefined;

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
    const { hasPhysics = true } = params;
    const { typePhysics = TypePhysics.CANNON } = params;

    this.parent = parent;

    // Create Updatables Manager
    this.updatablesManager = this.createUpdatablesManager();

    // Create Graphics Manager (Threejs scene) (can be override by custom graphics manager)
    this.graphicsManager = this.createGraphicsManager();

    if(hasPhysics) {
      //  Create Physics Manager (can be override by custom physics manager)
      this.physicsManager = this.createPhysicsManager();
      this.physicsManager?.setPhysics(typePhysics);
    }

    // Create Camera Manager (Threejs camera) (can be override by custom camera manager)
    this.cameraManager = this.createCameraManager();

    // Create Renderer Manager (Threejs renderer) (can be override by custom renderer manager)
    this.rendererManager = this.createRendererManager();

    // Create Loading Manager (can be override by custom loading manager)
    this.loadingManager = this.createLoadingManager();

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

  protected render(): void {
    requestAnimationFrame(() => {
      this.render();
    });

    // Update render RenderEngine
    const [timeStep, unscaledTimeStep] = this.rendererManager.render();

    // Logic
    this.update(timeStep, unscaledTimeStep);
  }

  // Update (Handles all logic updates)
  protected update(timeStep: number, unscaledTimeStep: number): void {
    this.updatablesManager?.update(timeStep, unscaledTimeStep);
  }

  protected setupStats(): void {
    this.stats = new Stats(this.updatablesManager);
  }

  // Override Methods to modify when extends WorldEngine ========================

  // Override this method to use custom Physics Manager
  protected createPhysicsManager(): PhysicsManager | null {
    const updatablesManager = this.getUpdatablesManager();

    if(!updatablesManager) return null;

    return new PhysicsManager(updatablesManager);
  }

  // Override this method to use custom Loading Manager
  protected createUpdatablesManager(): UpdatablesManager {
    return new UpdatablesManager();
  }

  // Override this method to use custom Loading Manager
  protected createLoadingManager(): LoadingManager {
    return new LoadingManager();
  }

  // Override this method to use custom Scenario Manager
  protected createScenarioManager(): ScenarioManager | null {
    const updatablesManager = this.getUpdatablesManager();
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();
    const physicsManager = this.getPhysicsManager();

    if (updatablesManager && loadingManager) {
      return new ScenarioManager(
        graphicsManager,
        physicsManager,
        updatablesManager,
        loadingManager
      );
    }
    return null;
  }

  // Override this method to use custom Camera Manager
  protected createCameraManager(): CameraManager {
    const parent = this.getParent();
    const width = getElementWidth(parent);
    const height = getElementHeight(parent);

    return new CameraManager(width, height);
  }

  // Override this method to use custom Renderer Manager
  protected createRendererManager(): RendererManager {
    const parent = this.getParent();
    const cameraManager = this.getCameraManager();
    const graphicsManager = this.getGraphicsManager();

    return new RendererManager(parent, cameraManager, graphicsManager);
  }

  // Override this method to use custom Graphics Manager
  protected createGraphicsManager(): GraphicsManager {
    return new GraphicsManager();
  }

  // Override this method to use custom Controls Manager
  protected createControlsManager(
    typeControls?: TypeControls
  ): ControlsManager | null {
    const updatablesManager = this.getUpdatablesManager();

    const cameraManager = this.getCameraManager();
    const camera = cameraManager.getCamera();

    const rendererManager = this.getRendererManager();
    const renderer = rendererManager?.getRenderer();
    const domElement = renderer?.domElement;

    if (!updatablesManager) return null;
    if (!domElement) return null;

    // Create controlsManager
    const controlsManager = new ControlsManager(
      camera,
      domElement,
      updatablesManager
    );

    // Set controls
    if (typeControls) {
      controlsManager.setControl(typeControls);
    } else {
      // Si no se selecciona el type, no instanciamos ningun control
      // controlsManager.setControl(TypeControls.Orbit);
    }

    return controlsManager;
  }

  // Public Method to expose to exterior =======================

  public getGraphicsManager(): GraphicsManager {
    return this.graphicsManager;
  }

  public getPhysicsManager(): PhysicsManager | undefined | null {
    return this.physicsManager;
  }

  public getCameraManager(): CameraManager {
    return this.cameraManager;
  }

  public getControlsManager(): ControlsManager | null | undefined {
    return this.controlsManager;
  }

  public getUpdatablesManager(): UpdatablesManager | undefined {
    return this.updatablesManager;
  }

  public getLoadingManager(): LoadingManager | undefined {
    return this.loadingManager;
  }

  public getRendererManager(): RendererManager | undefined {
    return this.rendererManager;
  }

  public getScenarioManager(): ScenarioManager | null | undefined {
    return this.scenarioManager;
  }

  public getParent(): HTMLElement {
    return this.parent;
  }
}
