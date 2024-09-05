import * as THREE from 'three';
import { IUpdatable } from '../interfaces/IUpdatable';
import { IWorldEngineParams } from '../interfaces/IWorldEngineParams';
import { RendererEngine } from '../renderer/RendererEngine';
import { getElementHeight, getElementWidth } from '../utils/FunctionLibrary';
import { ControlsManager } from '../controls/manager/ControlsManager';
import { TypeControls } from '../controls/enums/TypeControls';
import { Stats } from '../features/stats/Stats';
import { UpdatablesManager } from '../updatables/UpdatablesManager';
import { LoadingManager } from '../loading/manager/LoadingManager';
import { GraphicsWorld } from './graphicsWorld/GraphicsWorld';



export class WorldEngine {
	public camera: THREE.PerspectiveCamera;

  public graphicsWorld: GraphicsWorld;

  public controlsManager?: ControlsManager;

  public updatablesManager?: UpdatablesManager;

  public loadingManager?: LoadingManager;

  public rendererEngine: RendererEngine;

  public parent: HTMLElement;

  stats?: Stats;


  public params: any = {
  	Pointer_Lock: false,
		Mouse_Sensitivity: 0.3,
		Time_Scale: 1,
		Shadows: true,
		FXAA: true,
		Debug_Physics: false,
		Debug_FPS: false,
		Sun_Elevation: 50,
		Sun_Rotation: 145,
  };



  constructor(params: IWorldEngineParams) {
    const { parent } = params;
    const { typeControls } = params;
    const { hasStats = true } = params;

    this.parent = parent;

    const width = getElementWidth(parent);
    const height = getElementHeight(parent);

    // Three.js scene
		this.graphicsWorld = new GraphicsWorld();
		this.camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1010);
    this.camera.position.set(0,0,3);

    // Renderer
    this.rendererEngine = new RendererEngine(parent, this.camera, this.graphicsWorld.getScene());

    // Loading manager
    this.loadingManager = new LoadingManager();

    // Updatables manager
    this.updatablesManager = new UpdatablesManager();

    // Inicialización de ControlsManager
    if(typeControls) {
      this.setupControlsManager(typeControls);
    } else {
      // Si no se selecciona el type, no instanciamos el controlsManager
      // this.setupControlsManager(TypeControls.Orbit);
    }

    if(hasStats) {
      this.setupStats();
    }


    // Render call
    this.render();

  }

  private setupStats(): void {
    this.stats = new Stats(this.updatablesManager);
  }

  private setupControlsManager(type: TypeControls): void {
    this.controlsManager = new ControlsManager(this.camera, this.rendererEngine.renderer.domElement);
    this.controlsManager.setControl(type); // Puedes cambiar el tipo de control
  }


  /**
	 * Rendering loop.
	 * Implements fps limiter and frame-skipping
	 * Calls world's "update" function before rendering.
	 */
	public render(): void
	{

		requestAnimationFrame(() =>
		{
			this.render();
		});

    // Update render RenderEngine
    const [ timeStep, unscaledTimeStep ] = this.rendererEngine.render();

		// Logic
		this.update(timeStep, unscaledTimeStep);

  }


  // Update
	// Handles all logic updates.
	public update(timeStep: number, unscaledTimeStep: number): void
	{
    this.updatablesManager?.update(timeStep, unscaledTimeStep);
    this.controlsManager?.update();
	}



}
