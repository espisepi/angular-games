import * as CANNON from 'cannon-es';
import { ICollider } from '../interfaces/ICollider';

export interface CapsuleColliderParams {
  mass: number;
  position: CANNON.Vec3;
  height: number;
  radius: number;
  segments: number;
  friction: number;
}

export class CapsuleCollider implements ICollider {
  public options: any;
  public body: CANNON.Body;
  // public visual: THREE.Mesh;

  constructor(options?: CapsuleColliderParams) {
    let defaults = {
      mass: 0,
      position: new CANNON.Vec3(),
      height: 0.5,
      radius: 0.3,
      segments: 8,
      friction: 0.3,
    } as CapsuleColliderParams;

    this.options = { ...defaults, options };

    let mat = new CANNON.Material('capsuleMat');
    mat.friction = this.options.friction;

    let capsuleBody = new CANNON.Body({
      mass: this.options.mass,
      position: this.options.position,
    });

    // Compound shape
    let sphereShape = new CANNON.Sphere(this.options.radius);

    // Materials
    capsuleBody.material = mat;
    // sphereShape.material = mat;

    capsuleBody.addShape(sphereShape, new CANNON.Vec3(0, 0, 0));
    capsuleBody.addShape(
      sphereShape,
      new CANNON.Vec3(0, this.options.height / 2, 0)
    );
    capsuleBody.addShape(
      sphereShape,
      new CANNON.Vec3(0, -this.options.height / 2, 0)
    );

    this.body = capsuleBody;
  }
}
