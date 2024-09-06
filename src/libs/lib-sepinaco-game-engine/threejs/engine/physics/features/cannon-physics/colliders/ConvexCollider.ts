import * as CANNON from 'cannon-es';
import { ICollider } from '../interfaces/ICollider';
import { Vector3 } from 'three';
import { Object3D } from 'three';

export class ConvexCollider implements ICollider {
  public mesh: any;
  public options: any;
  public body: CANNON.Body;
  public debugModel: any;

  constructor(mesh: Object3D) {
    this.mesh = mesh.clone();

    let defaults = {
      mass: 0,
      position: mesh.position,
      friction: 0.3,
    };

    const options: any = {};
    this.options = options;

    let mat = new CANNON.Material('convMat');
    mat.friction = options.friction;
    // mat.restitution = 0.7;

    // YO creo que no hace falta hacer esto xD
    // if (this.mesh.geometry.isBufferGeometry)
    // {
    //   this.mesh.geometry = this.mesh.geometry.clone();
    // }

    let cannonPoints = this.mesh.geometry.vertices.map((v: Vector3) => {
      return new CANNON.Vec3(v.x, v.y, v.z);
    });

    let cannonFaces = this.mesh.geometry.faces.map((f: any) => {
      return [f.a, f.b, f.c];
    });

    let shape = new CANNON.ConvexPolyhedron({
      vertices: cannonPoints,
      faces: cannonFaces,
    });
    // shape.material = mat;

    // Add phys sphere
    let physBox = new CANNON.Body({
      mass: options.mass,
      position: options.position,
      shape,
    });

    physBox.material = mat;

    this.body = physBox;
  }
}
