import { Character } from "../scenarios/prefabs/character/Character";

export interface ICharacterAI {
	character: Character;
	update(timeStep: number): void;
}
