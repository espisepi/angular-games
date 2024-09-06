import StatsImpl from 'stats.js';
import { IUpdatable } from '../../interfaces/IUpdatable';
import { UpdatablesManager } from '../../updatables/manager/UpdatablesManager';

export class Stats implements IUpdatable {
  public updateOrder: number = 9;

  private _stats;

  constructor(updatablesManager?: UpdatablesManager, domElement?: HTMLElement) {
    this._stats = new StatsImpl();

    this._stats.showPanel(0);

    if (domElement) {
      domElement.appendChild(this._stats.dom);
    } else {
      document.body.appendChild(this._stats.dom);
    }

    if (updatablesManager) {
      updatablesManager.registerUpdatable(this);
    }
  }

  update(timestep: number, unscaledTimeStep: number): void {
    this._stats.update();
  }
}
