import { Type } from '@angular/core';
import { AbstractPhysics } from '../core/AbstractPhysics';
import { TypePhysics } from '../enums/TypePhysics';
import { CannonPhysics } from '../features/cannon-physics/CannonPhysics';

export class PhysicsFactory {
  static createPhysics(
    typePhysics: TypePhysics
  ): AbstractPhysics {
    switch (typePhysics) {
      case TypePhysics.CANNON:
        return new CannonPhysics();
      // Añade otros casos para diferentes tipos de motores de fisicas
      default:
        throw new Error(`Physics type "${typePhysics}" is not recognized.`);
    }
  }
}
