import * as THREE from 'three';
import { GLTF } from "three-stdlib";



export class Character extends THREE.Object3D {

  constructor(gltf: GLTF) {
    super();

    this.setAnimations(gltf.animations);

  }

  public setAnimations(animations: THREE.AnimationClip[]): void
	{
		this.animations = animations;
	}

}
