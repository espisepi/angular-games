import * as THREE from 'three';
import { IUpdatable } from '../interfaces/IUpdatable';
import { InputManager } from '../../games/sketchbook/controls/InputManager';
import { CameraOperator } from '../../games/sketchbook/controls/CameraOperator';
import { IWorldEngineOptions } from '../interfaces/IWorldEngineOptions';
import { RendererEngine } from '../core/RendererEngine';
import { getElementHeight, getElementWidth } from '../core/FunctionLibrary';
import { ControlsManager } from '../controls/manager/ControlsManager';
import { TypeControls } from '../controls/enums/TypeControls';





export class WorldEngine {
	public camera: THREE.PerspectiveCamera;

  public graphicsWorld: THREE.Scene;

  public inputManager: InputManager;
  public cameraOperator: CameraOperator;

  public controlsManager: ControlsManager;

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


    // Inicialización de ControlsManager (solo la primera vez se debe pasar camera y el dom element)
    this.controlsManager =  ControlsManager.getInstance(this.camera, this.rendererEngine.renderer.domElement);
    this.controlsManager.setControl(TypeControls.Orbit); // Puedes cambiar el tipo de control



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

    this.controlsManager.update();
	}



}
