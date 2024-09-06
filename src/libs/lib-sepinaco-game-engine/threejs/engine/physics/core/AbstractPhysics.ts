import * as CANNON from 'cannon-es';

export abstract class AbstractPhysics {

  constructor() { }

  abstract update(timestep: number, unscaledTimeStep: number): void;
  abstract dispose(): void;

  // Anadir en el tipado todos los worlds que soporte
  // de los distintos motores de fisicas
  // Es decir, CANNON.World | Ammo.btSoftRigidDynamicsWorld
  abstract getPhysicsWorld(): CANNON.World
}
