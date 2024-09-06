import * as CANNON from 'cannon-es';
import { AbstractPhysics } from '../../core/AbstractPhysics';


export class CannonPhysics extends AbstractPhysics{

  private physicsWorld: CANNON.World;

  constructor() {
    super();
    this.physicsWorld = this.createPhysicsWorld();
  }

  // Can be override
  protected createPhysicsWorld(): CANNON.World {
    const world = new CANNON.World({
      gravity: new CANNON.Vec3(0, -9.82, 0), // m/s²
    });
    return world;
  }

  // Public methods to expose attributes privates to exterior

  public getPhysicsWorld(): CANNON.World {
    return this.physicsWorld;
  }

  update(timestep: number, unscaledTimeStep: number): void {
    this.physicsWorld.fixedStep();
  }

  // TODO: dispose physics when not used any more
  dispose() {

  }

}
