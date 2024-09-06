import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { IUpdatable } from '../../../../../engine/interfaces/IUpdatable';
import { LoadingManager } from '../../../../../engine/loading/manager/LoadingManager';
import { UpdatablesManager } from '../../../../../engine/updatables/manager/UpdatablesManager';
import { GraphicsManager } from '../../../../../engine/graphics/manager/GraphicsManager';
import { PhysicsManager } from '../../../../../engine/physics/manager/PhysicsManager';
import { Character } from './Character';
import { GLTF } from 'three-stdlib';

export class CharacterManager implements IUpdatable {
  updateOrder: number = 999;

  private loadingManager: LoadingManager;
  private updatablesManager: UpdatablesManager;
  private graphicsManager: GraphicsManager;
  private physicsManager: PhysicsManager | null | undefined;

  private character?: Character;

  constructor(
    loadingManager: LoadingManager,
    updatablesManager: UpdatablesManager,
    graphicsManager: GraphicsManager,
    physicsManager: PhysicsManager | null | undefined
  ) {
    this.loadingManager = loadingManager;
    this.updatablesManager = updatablesManager;
    this.graphicsManager = graphicsManager;
    this.physicsManager = physicsManager;

    this.registerUpdatable();
    this.loadGLTF();
  }

  private registerUpdatable(): void {
    const updatablesManager = this.getUpdatablesManager();
    updatablesManager.registerUpdatable(this);
  }

  private loadGLTF(): void {
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();

    if (!loadingManager) return;

    loadingManager.onFinishedCallback = () => {
      console.log('finished loading manager! :)');
    };

    this.getLoadingManager()?.loadGLTF(
      '/assets/models/boxman.glb',
      (gltf: GLTF) => {
        console.log('gltf loaded: ', gltf);

        this.character = new Character(gltf);
        graphicsManager.add(gltf.scene);

      }
    );
  }


  update(timestep: number, unscaledTimeStep: number): void {

  }

  public getGraphicsManager(): GraphicsManager {
    return this.graphicsManager;
  }

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }

  public getLoadingManager(): LoadingManager {
    return this.loadingManager;
  }

  public getPhysicsManager(): PhysicsManager | null | undefined {
    return this.physicsManager;
  }
}
