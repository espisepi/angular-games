import * as THREE from 'three';
import { Space } from '../enums/Space';


// Dom utils ======================================

export function getElementWidth(element: HTMLElement): number {
    // let widthString = window.getComputedStyle(element).width; // Obtienes el valor computado de width, por ejemplo, "100px"
    // return parseFloat(widthString);
    return element.clientWidth;
}

export function getElementHeight(element: HTMLElement): number {
    // let heightString = window.getComputedStyle(element).height; // Obtienes el valor computado de height, por ejemplo, "100px"
    // return parseFloat(heightString);
    return element.clientHeight;
}



// Matrix utils ======================================

export function getRight(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3
{
	const matrix = getMatrix(obj, space);
	return new THREE.Vector3(
		matrix.elements[0],
		matrix.elements[1],
		matrix.elements[2]
		);
}

export function getUp(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3
{
	const matrix = getMatrix(obj, space);
	return new THREE.Vector3(
		matrix.elements[4],
		matrix.elements[5],
		matrix.elements[6]
		);
}

export function getForward(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3
{
	const matrix = getMatrix(obj, space);
	return new THREE.Vector3(
		matrix.elements[8],
		matrix.elements[9],
		matrix.elements[10]
		);
}

export function getBack(obj: THREE.Object3D, space: Space = Space.Global): THREE.Vector3
{
	const matrix = getMatrix(obj, space);
	return new THREE.Vector3(
		-matrix.elements[8],
		-matrix.elements[9],
		-matrix.elements[10]
		);
}

export function getMatrix(obj: THREE.Object3D, space: Space): THREE.Matrix4
{
	switch (space)
	{
		case Space.Local: return obj.matrix;
		case Space.Global: return obj.matrixWorld;
	}
}
