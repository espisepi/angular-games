import { TypeControls } from '../controls/enums/TypeControls';
import { TypePhysics } from '../physics/enums/TypePhysics';

export interface IWorldEngineParams {
  parent: HTMLElement;
  typeControls?: TypeControls;
  hasStats?: boolean;
  hasPhysics?: boolean;
  typePhysics?: TypePhysics;
}
