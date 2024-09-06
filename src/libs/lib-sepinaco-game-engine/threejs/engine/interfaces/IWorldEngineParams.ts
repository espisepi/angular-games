import { TypeControls } from '../controls/enums/TypeControls';

export interface IWorldEngineParams {
  parent: HTMLElement;
  typeControls?: TypeControls;
  hasStats?: boolean;
  hasPhysics?: boolean;
}
