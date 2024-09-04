import * as THREE from 'three';
import { IUpdatable } from '../interfaces/IUpdatable';
import { IWorldEngineOptions } from '../interfaces/IWorldEngineOptions';
import { RendererEngine } from '../renderer/RendererEngine';
import { getElementHeight, getElementWidth } from '../utils/FunctionLibrary';
import { ControlsManager } from '../controls/manager/ControlsManager';
import { TypeControls } from '../controls/enums/TypeControls';
import { Stats } from '../features/stats/Stats';
import { UpdatablesManager } from '../updatables/UpdatablesManager';



export class WorldEngine {
	public camera: THREE.PerspectiveCamera;

  public graphicsWorld: THREE.Scene;

  public controlsManager?: ControlsManager;

  public updatablesManager?: UpdatablesManager;

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



  constructor(options: IWorldEngineOptions) {
    const { parent } = options;
    const { typeControls } = options;
    const { hasStats = true } = options;

    this.parent = parent;

    const width = getElementWidth(parent);
    const height = getElementHeight(parent);

    // Three.js scene
		this.graphicsWorld = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1010);
    this.camera.position.set(0,0,3);

    // Renderer
    this.rendererEngine = new RendererEngine(parent, this.camera, this.graphicsWorld);

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
    this.stats = new Stats();
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
    this.stats?.update();
	}



}
