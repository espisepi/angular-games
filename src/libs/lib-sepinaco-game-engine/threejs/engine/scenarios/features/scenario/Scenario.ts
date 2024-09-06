import * as THREE from 'three';
import { GraphicsManager } from '../../../graphics/manager/GraphicsManager';
import { UpdatablesManager } from '../../../updatables/manager/UpdatablesManager';
import { BoxMesh } from '../../prefabs/box/BoxMesh';
import { LoadingManager } from '../../../loading/manager/LoadingManager';


export class Scenario {
  private graphicsManager: GraphicsManager;
  private updatablesManager: UpdatablesManager;
  private loadingManager: LoadingManager;

  constructor(
    graphicsManager: GraphicsManager,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    this.graphicsManager = graphicsManager;
    this.updatablesManager = updatablesManager;
    this.loadingManager = loadingManager;

    this.initLights();
    this.initObjects();
  }

  // override this method to create custom lights
  protected initLights(): void {
    const graphicsManager = this.graphicsManager;

    // light
    const light = new THREE.AmbientLight();
    graphicsManager.add(light);
  }

  // override this method to create custom objects
  protected initObjects(): void {
    const updatablesManager = this.getUpdatablesManager();
    const graphicsManager = this.getGraphicsManager();

    // create mesh
    const mesh = new BoxMesh();
    updatablesManager.registerUpdatable(mesh);
    graphicsManager.add(mesh);
  }

  // Public methods ========================

  public getGraphicsManager(): GraphicsManager {
    return this.graphicsManager;
  }

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }

  public getLoadingManager(): LoadingManager {
    return this.loadingManager;
  }
}
