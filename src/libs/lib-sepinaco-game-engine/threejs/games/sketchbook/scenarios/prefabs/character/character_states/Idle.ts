// import
// {
// 	CharacterStateBase,
// 	JumpIdle,
// 	Walk,
// } from './_stateLibrary';
import { CharacterStateBase } from './CharacterStateBase';
import { ICharacterState } from '../../../../interfaces/ICharacterState';
import { Character } from '../Character';

export class Idle extends CharacterStateBase implements ICharacterState
{
	constructor(character: Character)
	{
		super(character);

		this.character.velocitySimulator.damping = 0.6;
		this.character.velocitySimulator.mass = 10;

		this.character.setArcadeVelocityTarget(0);
		this.playAnimation('idle', 0.1);
	}

	public override update(timeStep: number): void
	{
		super.update(timeStep);

		// this.fallInAir();
	}
	public override onInputChange(): void
	{
		super.onInputChange();

		// if (this.character.actions.jump.justPressed)
		// {
		// 	this.character.setState(new JumpIdle(this.character));
		// }

		// if (this.anyDirection())
		// {
		// 	if (this.character.velocity.length() > 0.5)
		// 	{
		// 		this.character.setState(new Walk(this.character));
		// 	}
		// 	else
		// 	{
		// 		this.setAppropriateStartWalkState();
		// 	}
		// }
	}
}
