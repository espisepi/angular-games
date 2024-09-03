import * as THREE from 'three';
import { IUpdatable } from '../interfaces/IUpdatable';
import { InputManager } from '../core/InputManager';
import { CameraOperator } from '../core/CameraOperator';





export class WorldEngine {
  public renderer: THREE.WebGLRenderer;
	public camera: THREE.PerspectiveCamera;

  public graphicsWorld: THREE.Scene;

  public clock: THREE.Clock;
	public renderDelta: number;
	public logicDelta: number;
	public requestDelta?: number;
	public sinceLastFrame: number;
	public justRendered: boolean;

  public inputManager: InputManager;
  public cameraOperator: CameraOperator;



  public width: number;
  public height: number;

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

  constructor(parent: HTMLElement) {
    const scope = this;

    // TODO: Refactor con metodo porque se repite
    let widthString = window.getComputedStyle(parent).width; // Obtienes el valor computado de width, por ejemplo, "100px"
    let heightString = window.getComputedStyle(parent).height; // Obtienes el valor computado de width, por ejemplo, "100px"
    this.width = parseFloat(widthString);
    this.height = parseFloat(heightString);



    // Renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);
		// this.renderer.setSize(window.innerWidth, window.innerHeight);
		// this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
		// this.renderer.toneMappingExposure = 1.0;
		// this.renderer.shadowMap.enabled = true;
		// this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Canvas
		parent.appendChild(this.renderer.domElement);
		this.renderer.domElement.id = 'canvas';

    // Auto window resize
		function onWindowResize(): void
		{
      // TODO: Refactor con metodo porque se repite
      let widthString = window.getComputedStyle(parent).width; // Obtienes el valor computado de width, por ejemplo, "100px"
      let heightString = window.getComputedStyle(parent).height; // Obtienes el valor computado de width, por ejemplo, "100px"
      scope.width = parseFloat(widthString);
      scope.height = parseFloat(heightString);


      scope.camera.aspect = scope.width / scope.height;
			// scope.camera.aspect = window.innerWidth / window.innerHeight;
			scope.camera.updateProjectionMatrix();
      scope.renderer.setSize(scope.width, scope.height);
			// scope.renderer.setSize(window.innerWidth, window.innerHeight);
			// fxaaPass.uniforms['resolution'].value.set(1 / (window.innerWidth * pixelRatio), 1 / (window.innerHeight * pixelRatio));
			// scope.composer.setSize(window.innerWidth * pixelRatio, window.innerHeight * pixelRatio);
		}
		window.addEventListener('resize', onWindowResize, false);

    // Three.js scene
		this.graphicsWorld = new THREE.Scene();
		this.camera = new THREE.PerspectiveCamera(80, this.width / this.height, 0.1, 1010);
    this.camera.position.set(0,0,3);

    // RenderLoop
		this.clock = new THREE.Clock();
		this.renderDelta = 0;
		this.logicDelta = 0;
		this.sinceLastFrame = 0;
		this.justRendered = false;

    // Initialization
		this.inputManager = new InputManager(this, this.renderer.domElement);
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
    		this.requestDelta = this.clock.getDelta();

		requestAnimationFrame(() =>
		{
			this.render();
		});

		// Getting timeStep
		let unscaledTimeStep = (this.requestDelta + this.renderDelta + this.logicDelta) ;
		let timeStep = unscaledTimeStep * this.params.Time_Scale;
		timeStep = Math.min(timeStep, 1 / 30);    // min 30 fps

		// Logic
		this.update(timeStep, unscaledTimeStep);

		// Measuring logic time
		this.logicDelta = this.clock.getDelta();

		// Frame limiting
		let interval = 1 / 60;
		this.sinceLastFrame += this.requestDelta + this.renderDelta + this.logicDelta;
		this.sinceLastFrame %= interval;

		// Stats end
		// this.stats.end();
		// this.stats.begin();

		// Actual rendering with a FXAA ON/OFF switch
		// if (this.params.FXAA) this.composer.render();
		// else this.renderer.render(this.graphicsWorld, this.camera);
    this.renderer.render(this.graphicsWorld, this.camera);

		// Measuring render time
		this.renderDelta = this.clock.getDelta();


  }

  public registerUpdatable(registree: IUpdatable): void
	{
		this.updatables.push(registree);
		this.updatables.sort((a, b) => (a.updateOrder > b.updateOrder) ? 1 : -1);
	}


  public updateControls(controls: any): void
	{
    console.log("Update Controls, new Controls: " + controls);
		// let html = '';
		// html += '<h2 class="controls-title">Controls:</h2>';

		// controls.forEach((row: any) =>
		// {
		// 	html += '<div class="ctrl-row">';
		// 	row.keys.forEach((key: any) => {
		// 		if (key === '+' || key === 'and' || key === 'or' || key === '&') html += '&nbsp;' + key + '&nbsp;';
		// 		else html += '<span class="ctrl-key">' + key + '</span>';
		// 	});

		// 	html += '<span class="ctrl-desc">' + row.desc + '</span></div>';
		// });

		// document.getElementById('controls').innerHTML = html;
	}

  // Update
	// Handles all logic updates.
	public update(timeStep: number, unscaledTimeStep: number): void
	{
		// this.updatePhysics(timeStep);

		// Update registred objects
		this.updatables.forEach((entity) => {
			entity.update(timeStep, unscaledTimeStep);
		});

		// Lerp time scale
		// this.params.Time_Scale = THREE.MathUtils.lerp(this.params.Time_Scale, this.timeScaleTarget, 0.2);

		// Physics debug
		// if (this.params.Debug_Physics) this.cannonDebugRenderer.update();
	}



}
