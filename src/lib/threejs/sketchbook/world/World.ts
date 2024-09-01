import * as THREE from 'three';



export class World {

  public renderer: THREE.WebGLRenderer;
	public camera: THREE.PerspectiveCamera;

  public graphicsWorld: THREE.Scene;

  public clock: THREE.Clock;
	public renderDelta: number;
	public logicDelta: number;
	public requestDelta?: number;
	public sinceLastFrame: number;
	public justRendered: boolean;

  public width: number;
  public height: number;

  public mesh: THREE.Mesh;


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


    // Render call
    this.render(this);

    // create mesh
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1,1,1),
      new THREE.MeshBasicMaterial({
        wireframe: true,
        color: new THREE.Color('green')
      })
    );
    this.graphicsWorld.add(this.mesh);

  }


  /**
	 * Rendering loop.
	 * Implements fps limiter and frame-skipping
	 * Calls world's "update" function before rendering.
	 * @param {World} world
	 */
	public render(world: World): void
	{
    this.requestDelta = this.clock.getDelta();

    requestAnimationFrame(() =>
		{
			world.render(world);
		});

    this.renderer.render(this.graphicsWorld, this.camera);

		// Measuring render time
		this.renderDelta = this.clock.getDelta();

    // Getting timeStep
		// let unscaledTimeStep = (this.requestDelta + this.renderDelta + this.logicDelta) ;
		// let timeStep = unscaledTimeStep * this.params.Time_Scale;
		// timeStep = Math.min(timeStep, 1 / 30);    // min 30 fps

    this.mesh?.rotateY(this.renderDelta * 5);

  }


}
