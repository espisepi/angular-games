import * as CANNON from 'cannon-es';
import * as THREE from 'three';
import { ICollider } from '../interfaces/ICollider';

export class SphereCollider implements ICollider
{
	public options: any;
	public body: CANNON.Body;
	public debugModel?: THREE.Mesh;

	constructor()
	{
		let defaults = {
			mass: 0,
			position: new CANNON.Vec3(),
			radius: 0.3,
			friction: 0.3
		};

    const options: any = {};
    this.options = options;

		let mat = new CANNON.Material('sphereMat');
		mat.friction = options.friction;

		let shape = new CANNON.Sphere(options.radius);
		// shape.material = mat;

		// Add phys sphere
		let physSphere = new CANNON.Body({
			mass: options.mass,
			position: options.position,
			shape
		});
		physSphere.material = mat;

		this.body = physSphere;
	}
}
