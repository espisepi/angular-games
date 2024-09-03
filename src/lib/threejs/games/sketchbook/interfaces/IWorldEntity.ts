import { World } from '../world/WorldSketchbook';
import { EntityType } from '../enums/EntityType';
import { IUpdatable } from '../../../engine/interfaces/IUpdatable';

export interface IWorldEntity extends IUpdatable
{
	entityType: EntityType;

	addToWorld(world: World): void;
	removeFromWorld(world: World): void;
}
