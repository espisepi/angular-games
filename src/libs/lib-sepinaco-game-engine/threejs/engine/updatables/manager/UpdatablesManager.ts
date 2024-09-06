import { IUpdatable } from '../../interfaces/IUpdatable';

export class UpdatablesManager {
  private _updatables: IUpdatable[] = [];

  constructor() {}

  public getUpdatables(): IUpdatable[] {
    return this._updatables;
  }

  public registerUpdatable(registree: IUpdatable): void {
    this._updatables.push(registree);
    this._updatables.sort((a, b) => (a.updateOrder > b.updateOrder ? 1 : -1));
  }

  public unregisterUpdatable(registree: IUpdatable): void {
    this._updatables = this._updatables.filter((item) => item !== registree);
  }

  public update(timeStep: number, unscaledTimeStep: number): void {
    // Update registred objects
    this._updatables.forEach((entity) => {
      entity.update(timeStep, unscaledTimeStep);
    });
  }
}
