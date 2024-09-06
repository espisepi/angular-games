import * as CANNON from 'cannon-es';
import { IUpdatable } from '../../interfaces/IUpdatable';

export class PhysicsManager implements IUpdatable{
  updateOrder: number = 1;

  private physicsWorld: CANNON.World;

  constructor() {
    this.physicsWorld = this.createPhysicsWorld();
  }

  update(timestep: number, unscaledTimeStep: number): void {
    this.physicsWorld.fixedStep();
  }

  // Override Methods ==============

  // Can be override
  protected createPhysicsWorld(): CANNON.World {
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    });
    return world;
  }
}
