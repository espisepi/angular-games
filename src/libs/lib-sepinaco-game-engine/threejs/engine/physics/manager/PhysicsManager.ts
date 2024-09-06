import { IUpdatable } from '../../interfaces/IUpdatable';
import { UpdatablesManager } from '../../updatables/manager/UpdatablesManager';
import { AbstractPhysics } from '../core/AbstractPhysics';
import { TypePhysics } from '../enums/TypePhysics';
import { PhysicsFactory } from '../factory/PhysicsFactory';
import { CannonPhysics } from '../features/cannon-physics/CannonPhysics';

export class PhysicsManager implements IUpdatable {
  updateOrder: number = 1;

  private updatablesManager: UpdatablesManager;

  private currentPhysics: AbstractPhysics | null = null;

  private currentTypePhysics: TypePhysics | null = null;


  constructor(updatablesManager: UpdatablesManager) {
    this.updatablesManager = updatablesManager;

    this.registerUpdatable();
  }

  public setPhysics(typePhysics: TypePhysics): void {
    // Check if is the same than actual
    if (this.currentTypePhysics === typePhysics) return;

    // Dispose del anterior physics
    if (this.currentPhysics) {
      this.currentPhysics.dispose();
    }

    // Create new physics of type typePhysics
    this.currentTypePhysics = typePhysics;
    this.currentPhysics = PhysicsFactory.createPhysics(typePhysics);
  }


  update(timestep: number, unscaledTimeStep: number): void {
    this.currentPhysics?.update(timestep, unscaledTimeStep);
  }

  private registerUpdatable(): void {
    const updatablesManager = this.getUpdatablesManager();
    updatablesManager.registerUpdatable(this);
  }

  // Override Methods ==============



  // Public methods to expose exterior

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }

  public getCurrentPhysics(): AbstractPhysics | null {
    return this.currentPhysics;
  }
}
