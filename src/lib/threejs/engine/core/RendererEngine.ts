import * as THREE from 'three';
import { getElementHeight, getElementWidth } from './FunctionLibrary';


export class RendererEngine {

  public renderer: THREE.WebGLRenderer;

  public width: number;
  public height: number;

  public camera: THREE.PerspectiveCamera;
  public parent: HTMLElement;

  constructor(parent: HTMLElement, camera: THREE.PerspectiveCamera) {

    this.parent = parent;
    this.camera = camera;

    this.width = getElementWidth(parent);
    this.height = getElementHeight(parent);

    // Renderer
		this.renderer = new THREE.WebGLRenderer();
		this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(this.width, this.height);

    // Canvas
		parent.appendChild(this.renderer.domElement);
		this.renderer.domElement.id = 'canvas';

    // Auto window resize
		const onWindowResize = () =>
		{

      this.camera.aspect = this.width / this.height;
			this.camera.updateProjectionMatrix();

      this.renderer.setSize(this.width, this.height);

		}
		window.addEventListener('resize', onWindowResize, false);

  }

  render(): void {

  }
}
