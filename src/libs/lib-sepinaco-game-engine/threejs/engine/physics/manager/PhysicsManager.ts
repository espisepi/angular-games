import * as CANNON from 'cannon-es';
import { IUpdatable } from '../../interfaces/IUpdatable';
import { UpdatablesManager } from '../../updatables/manager/UpdatablesManager';

export class PhysicsManager implements IUpdatable {
  updateOrder: number = 1;

  private updatablesManager: UpdatablesManager;

  private physicsWorld: CANNON.World;

  constructor(updatablesManager: UpdatablesManager) {
    this.updatablesManager = updatablesManager;

    this.registerUpdatable();
    this.physicsWorld = this.createPhysicsWorld();
  }

  update(timestep: number, unscaledTimeStep: number): void {
    this.physicsWorld.fixedStep();
  }

  private registerUpdatable(): void {
    const updatablesManager = this.getUpdatablesManager();
    updatablesManager.registerUpdatable(this);
  }

  // Override Methods ==============

  // Can be override
  protected createPhysicsWorld(): CANNON.World {
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    });
    return world;
  }

  // Public methods to expose exterior

  public getPhysicsWorld(): CANNON.World {
    return this.physicsWorld;
  }

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }
}
