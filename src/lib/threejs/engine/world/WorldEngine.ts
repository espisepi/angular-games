import * as THREE from 'three';
import { IUpdatable } from '../interfaces/IUpdatable';
import { InputManager } from '../core/InputManager';
import { CameraOperator } from '../core/CameraOperator';
import { IWorldEngineOptions } from '../interfaces/IWorldEngineOptions';
import { RendererEngine } from '../core/RendererEngine';
import { getElementHeight, getElementWidth } from '../core/FunctionLibrary';





export class WorldEngine {
	public camera: THREE.PerspectiveCamera;

  public graphicsWorld: THREE.Scene;

  public inputManager: InputManager;
  public cameraOperator: CameraOperator;

  public rendererEngine: RendererEngine;


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

  public updatables: IUpdatable[] = [];

  constructor(options: IWorldEngineOptions) {
    const { parent } = options;

    const width = getElementWidth(parent);
    const height = getElementHeight(parent);

    // Three.js scene
		this.graphicsWorld = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(80, width / height, 0.1, 1010);
    this.camera.position.set(0,0,3);

    // Renderer
    this.rendererEngine = new RendererEngine(parent, this.camera, this.graphicsWorld);


    // Initialization
		this.inputManager = new InputManager(this, this.rendererEngine.renderer.domElement);
    this.cameraOperator = new CameraOperator(this, this.camera, this.params.Mouse_Sensitivity);



    // Render call
    this.render();

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

  public registerUpdatable(registree: IUpdatable): void
	{
		this.updatables.push(registree);
		this.updatables.sort((a, b) => (a.updateOrder > b.updateOrder) ? 1 : -1);
	}


  public updateControls(controls: any): void
	{
    console.log("Update Controls, new Controls: " + controls);
	}

  // Update
	// Handles all logic updates.
	public update(timeStep: number, unscaledTimeStep: number): void
	{
		// Update registred objects
		this.updatables.forEach((entity) => {
			entity.update(timeStep, unscaledTimeStep);
		});
	}



}
