import StatsImpl from 'stats.js'


export class Stats {

  private _stats;

  constructor(domElement?: HTMLElement) {

    this._stats = new StatsImpl();

    this._stats.showPanel(0);

    if(domElement) {
      domElement.appendChild(this._stats.dom);
    } else {
      document.body.appendChild(this._stats.dom);
    }
  }

  update(): void {
    this._stats.update();
  }

}
