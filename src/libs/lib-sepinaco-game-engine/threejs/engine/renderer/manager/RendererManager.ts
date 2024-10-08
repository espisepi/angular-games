import * as THREE from 'three';
import { getElementHeight, getElementWidth } from '../../utils/FunctionLibrary';
import { GraphicsManager } from '../../graphics/manager/GraphicsManager';
import { CameraManager } from '../../cameras/manager/CameraManager';

export class RendererManager {
  private clock: THREE.Clock;
  private renderDelta: number;
  private logicDelta: number;
  private requestDelta?: number;
  private sinceLastFrame: number;
  private justRendered: boolean;

  // ============================

  private renderer: THREE.WebGLRenderer;

  private width: number;
  private height: number;

  private cameraManager: CameraManager;
  private camera: THREE.PerspectiveCamera;

  private graphicsManager: GraphicsManager;
  private scene: THREE.Scene;

  private parent: HTMLElement;

  // ===========================

  constructor(
    parent: HTMLElement,
    cameraManager: CameraManager,
    graphicsManager: GraphicsManager
  ) {
    this.parent = parent;

    this.cameraManager = cameraManager;
    this.camera = this.cameraManager.getCamera();

    this.graphicsManager = graphicsManager;
    this.scene = this.graphicsManager.getScene();

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

  /**
   * Rendering loop.
   * Implements fps limiter and frame-skipping
   * Calls world's "update" function before rendering.
   */
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
    // else this.renderer.render(this.graphicsManager, this.camera);
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
