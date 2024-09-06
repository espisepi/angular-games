import * as THREE from 'three';
import { GLTF } from 'three-stdlib';
import { VectorSpringSimulator } from '../../../../../engine/physics/core/spring_simulation/VectorSpringSimulator';
import { RelativeSpringSimulator } from '../../../../../engine/physics/core/spring_simulation/RelativeSpringSimulator';
import { EntityType } from '../../../enums/EntityType';
import { KeyBinding } from '../../../controls/KeyBinding';

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
  // public characterCapsule: CapsuleCollider;

  // Ray casting
  // public rayResult: CANNON.RaycastResult = new CANNON.RaycastResult();
  // public rayHasHit: boolean = false;
  // public rayCastLength: number = 0.57;
  // public raySafeOffset: number = 0.03;
  // public wantsToJump: boolean = false;
  // public initJumpSpeed: number = -1;
  // public groundImpactData: GroundImpactData = new GroundImpactData();
  // public raycastBox: THREE.Mesh;

  // public world: World;
  // public charState: ICharacterState;
  // public behaviour: ICharacterAI;

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

    // this.velocitySimulator = new VectorSpringSimulator(60, this.defaultVelocitySimulatorMass, this.defaultVelocitySimulatorDamping);
    // this.rotationSimulator = new RelativeSpringSimulator(60, this.defaultRotationSimulatorMass, this.defaultRotationSimulatorDamping);

    // this.viewVector = new THREE.Vector3();
  }

  private setAnimations(animations: THREE.AnimationClip[]): void {
    this.animations = animations;
  }

  // public methods ==================

  public getTiltContainer(): THREE.Group {
    return this.tiltContainer;
  }
}
