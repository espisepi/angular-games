import * as THREE from 'three';
import { getElementHeight, getElementWidth } from '../utils/FunctionLibrary';

export class RendererManager {
  public clock: THREE.Clock;
  public renderDelta: number;
  public logicDelta: number;
  public requestDelta?: number;
  public sinceLastFrame: number;
  public justRendered: boolean;

  // ============================

  private renderer: THREE.WebGLRenderer;

  public width: number;
  public height: number;

  public camera: THREE.PerspectiveCamera;
  public scene: THREE.Scene;
  public parent: HTMLElement;

  // ===========================

  constructor(
    parent: HTMLElement,
    camera: THREE.PerspectiveCamera,
    scene: THREE.Scene
  ) {
    this.parent = parent;
    this.camera = camera;
    this.scene = scene;

    this.width = getElementWidth(parent);
    this.height = getElementHeight(parent);

    /// ============================================

    // Renderer
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    // Canvas
    parent.appendChild(this.renderer.domElement);
    this.renderer.domElement.id = 'canvas';

    // Auto window resize
    const onWindowResize = () => {
      // this.camera.aspect = parent.clientWidth / parent.clientHeight;
      this.camera.aspect = 1;

      this.camera.updateProjectionMatrix();

      // console.log({width: parent.clientWidth, height: parent.clientHeight})

      this.renderer.setSize(parent.clientWidth, parent.clientWidth);
    };
    window.addEventListener('resize', onWindowResize, false);

    // =========================================

    // RenderLoop
    this.clock = new THREE.Clock();
    this.renderDelta = 0;
    this.logicDelta = 0;
    this.sinceLastFrame = 0;
    this.justRendered = false;
  }

  render(): number[] {
    this.requestDelta = this.clock.getDelta();

    // Getting timeStep
    let unscaledTimeStep =
      this.requestDelta + this.renderDelta + this.logicDelta;
    // let timeStep = unscaledTimeStep * this.params.Time_Scale;
    let timeStep = unscaledTimeStep * 1;
    timeStep = Math.min(timeStep, 1 / 30); // min 30 fps

    // Measuring logic time
    this.logicDelta = this.clock.getDelta();

    // Frame limiting
    let interval = 1 / 60;
    this.sinceLastFrame +=
      this.requestDelta + this.renderDelta + this.logicDelta;
    this.sinceLastFrame %= interval;

    // Stats end
    // this.stats.end();
    // this.stats.begin();

    // Actual rendering with a FXAA ON/OFF switch
    // if (this.params.FXAA) this.composer.render();
    // else this.renderer.render(this.graphicsWorld, this.camera);
    this.renderer.render(this.scene, this.camera);

    // Measuring render time
    this.renderDelta = this.clock.getDelta();

    return [timeStep, unscaledTimeStep];
  }

  // public methods ====================

  public getRenderer(): THREE.Renderer {
    return this.renderer;
  }
}
