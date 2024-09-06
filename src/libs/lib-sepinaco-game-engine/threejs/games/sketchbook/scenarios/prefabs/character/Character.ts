import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { GLTF } from 'three-stdlib';
import { VectorSpringSimulator } from '../../../../../engine/physics/core/spring_simulation/VectorSpringSimulator';
import { RelativeSpringSimulator } from '../../../../../engine/physics/core/spring_simulation/RelativeSpringSimulator';
import { EntityType } from '../../../enums/EntityType';
import { KeyBinding } from '../../../controls/KeyBinding';
import {
  CapsuleCollider,
  CapsuleColliderParams,
} from '../../../../../engine/physics/features/cannon-physics/colliders/CapsuleCollider';
import { GroundImpactData } from './GroundImpactData';
import { ICharacterState } from '../../../interfaces/ICharacterState';
import { ICharacterAI } from '../../../interfaces/ICharacterAI';
import { Idle } from './character_states/Idle';

export class Character extends THREE.Object3D {
  public updateOrder: number = 1;
  public entityType: EntityType = EntityType.Character;

  public height: number = 0;
  public tiltContainer: THREE.Group;
  public modelContainer: THREE.Group;
  public materials: THREE.Material[] = [];
  public mixer: THREE.AnimationMixer;

  // Movement
  public acceleration: THREE.Vector3 = new THREE.Vector3();
  public velocity: THREE.Vector3 = new THREE.Vector3();
  public arcadeVelocityInfluence: THREE.Vector3 = new THREE.Vector3();
  public velocityTarget: THREE.Vector3 = new THREE.Vector3();
  public arcadeVelocityIsAdditive: boolean = false;

  public defaultVelocitySimulatorDamping: number = 0.8;
  public defaultVelocitySimulatorMass: number = 50;
  public velocitySimulator!: VectorSpringSimulator;
  public moveSpeed: number = 4;
  public angularVelocity: number = 0;
  public orientation: THREE.Vector3 = new THREE.Vector3(0, 0, 1);
  public orientationTarget: THREE.Vector3 = new THREE.Vector3(0, 0, 1);
  public defaultRotationSimulatorDamping: number = 0.5;
  public defaultRotationSimulatorMass: number = 10;
  public rotationSimulator!: RelativeSpringSimulator;
  public viewVector!: THREE.Vector3;
  public actions!: { [action: string]: KeyBinding };
  public characterCapsule!: CapsuleCollider;

  // Ray casting
  public rayResult: CANNON.RaycastResult = new CANNON.RaycastResult();
  public rayHasHit: boolean = false;
  public rayCastLength: number = 0.57;
  public raySafeOffset: number = 0.03;
  public wantsToJump: boolean = false;
  public initJumpSpeed: number = -1;
  public groundImpactData: GroundImpactData = new GroundImpactData();
  public raycastBox!: THREE.Mesh;

  public charState!: ICharacterState;
  public behaviour!: ICharacterAI;

  // Vehicles
  // public controlledObject: IControllable;
  // public occupyingSeat: VehicleSeat = null;
  // public vehicleEntryInstance: VehicleEntryInstance = null;

  private physicsEnabled: boolean = true;

  constructor(gltf: GLTF) {
    super();

    this.setAnimations(gltf.animations);

    // The visuals group is centered for easy character tilting
    this.tiltContainer = new THREE.Group();
    this.add(this.tiltContainer);

    // Model container is used to reliably ground the character, as animation can alter the position of the model itself
    this.modelContainer = new THREE.Group();
    this.modelContainer.position.y = -0.57;
    this.tiltContainer.add(this.modelContainer);
    this.modelContainer.add(gltf.scene);

    this.mixer = new THREE.AnimationMixer(gltf.scene);

    this.velocitySimulator = new VectorSpringSimulator(
      60,
      this.defaultVelocitySimulatorMass,
      this.defaultVelocitySimulatorDamping
    );
    this.rotationSimulator = new RelativeSpringSimulator(
      60,
      this.defaultRotationSimulatorMass,
      this.defaultRotationSimulatorDamping
    );

    this.viewVector = new THREE.Vector3();

    // Actions
    this.actions = {
      up: new KeyBinding('KeyW'),
      down: new KeyBinding('KeyS'),
      left: new KeyBinding('KeyA'),
      right: new KeyBinding('KeyD'),
      run: new KeyBinding('ShiftLeft'),
      jump: new KeyBinding('Space'),
      use: new KeyBinding('KeyE'),
      enter: new KeyBinding('KeyF'),
      enter_passenger: new KeyBinding('KeyG'),
      seat_switch: new KeyBinding('KeyX'),
      primary: new KeyBinding('Mouse0'),
      secondary: new KeyBinding('Mouse1'),
    };

    // Physics
    // Player Capsule
    this.characterCapsule = new CapsuleCollider({
      mass: 1,
      position: new CANNON.Vec3(),
      height: 0.5,
      radius: 0.25,
      segments: 8,
      friction: 0.0,
    } as CapsuleColliderParams);
    // capsulePhysics.physical.collisionFilterMask = ~CollisionGroups.Trimesh;
    // this.characterCapsule.body.shapes.forEach((shape) => {
    //   // tslint:disable-next-line: no-bitwise
    //   shape.collisionFilterMask = ~CollisionGroups.TrimeshColliders;
    // });
    // this.characterCapsule.body.allowSleep = false;

    // Move character to different collision group for raycasting
    // this.characterCapsule.body.collisionFilterGroup = 2;

    // Disable character rotation
    this.characterCapsule.body.fixedRotation = true;
    this.characterCapsule.body.updateMassProperties();

    // Ray cast debug
    const boxGeo = new THREE.BoxGeometry(0.1, 0.1, 0.1);
    const boxMat = new THREE.MeshLambertMaterial({
      color: 0xff0000,
    });
    this.raycastBox = new THREE.Mesh(boxGeo, boxMat);
    this.raycastBox.visible = false;

    // Physics pre/post step callback bindings
    // this.characterCapsule.body.preStep = (body: CANNON.Body) => {
    //   this.physicsPreStep(body, this);
    // };
    // this.characterCapsule.body.postStep = (body: CANNON.Body) => {
    //   this.physicsPostStep(body, this);
    // };

    // States
    this.setState(new Idle(this));
  }

  private setAnimations(animations: THREE.AnimationClip[]): void {
    this.animations = animations;
  }

  public setArcadeVelocityInfluence(
    x: number,
    y: number = x,
    z: number = x
  ): void {
    this.arcadeVelocityInfluence.set(x, y, z);
  }

  public setArcadeVelocityTarget(velZ: number, velX: number = 0, velY: number = 0): void
	{
		this.velocityTarget.z = velZ;
		this.velocityTarget.x = velX;
		this.velocityTarget.y = velY;
	}

  /**
   * Set state to the player. Pass state class (function) name.
   * @param {function} State
   */
  public setState(state: ICharacterState): void {
    this.charState = state;
    this.charState.onInputChange();
  }

  public setAnimation(clipName: string, fadeIn: number): number {
    if (this.mixer !== undefined) {
      // gltf
      let clip = THREE.AnimationClip.findByName(this.animations, clipName);

      let action = this.mixer.clipAction(clip);
      if (action === null) {
        console.error(`Animation ${clipName} not found!`);
        return 0;
      }

      this.mixer.stopAllAction();
      action.fadeIn(fadeIn);
      action.play();

      return action.getClip().duration;
    }
    return 0;
  }

  public update(timeStep: number): void
	{
		this.behaviour?.update(timeStep);
		// this.vehicleEntryInstance?.update(timeStep);
		// console.log(this.occupyingSeat);
		this.charState?.update(timeStep);

		// this.visuals.position.copy(this.modelOffset);
		// if (this.physicsEnabled) this.springMovement(timeStep);
		// if (this.physicsEnabled) this.springRotation(timeStep);
		// if (this.physicsEnabled) this.rotateModel();

    if (this.mixer !== undefined) this.mixer.update(timeStep);

		// Sync physics/graphics
		if (this.physicsEnabled)
		{
			this.position.set(
				this.characterCapsule.body.interpolatedPosition.x,
				this.characterCapsule.body.interpolatedPosition.y,
				this.characterCapsule.body.interpolatedPosition.z
			);
		}
		else {
			let newPos = new THREE.Vector3();
			this.getWorldPosition(newPos);

			// this.characterCapsule.body.position.copy(Utils.cannonVector(newPos));
			// this.characterCapsule.body.interpolatedPosition.copy(Utils.cannonVector(newPos));
		}

		this.updateMatrixWorld();
	}

  public springMovement(timeStep: number): void
	{
		// Simulator
		this.velocitySimulator.target.copy(this.velocityTarget);
		this.velocitySimulator.simulate(timeStep);

		// Update values
		this.velocity.copy(this.velocitySimulator.position);
		this.acceleration.copy(this.velocitySimulator.velocity);
	}

  // public methods ==================

  public getTiltContainer(): THREE.Group {
    return this.tiltContainer;
  }
}
