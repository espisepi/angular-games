import * as CANNON from 'cannon-es';
import { ICollider } from '../interfaces/ICollider';
import {Object3D} from 'three';
// TODO: Fix this error when descommented
// import { threeToCannon, ShapeType } from 'three-to-cannon';

export class TrimeshCollider implements ICollider
{
	public mesh: any;
	public options: any;
	public body: CANNON.Body;
	public debugModel: any;

	constructor(mesh: Object3D)
	{
		this.mesh = mesh.clone();

		let defaults = {
			mass: 0,
			position: mesh.position,
			rotation: mesh.quaternion,
			friction: 0.3
		};

    const options: any = {};
    this.options = options;

		let mat = new CANNON.Material('triMat');
		mat.friction = options.friction;
		// mat.restitution = 0.7;

		// let shape = threeToCannon(this.mesh, {type: ShapeType.MESH});
		// shape['material'] = mat;

		// Add phys sphere
		let physBox = new CANNON.Body({
			mass: options.mass,
			position: options.position,
			quaternion: options.rotation,
			// shape: shape
		});

		physBox.material = mat;

		this.body = physBox;
	}
}
