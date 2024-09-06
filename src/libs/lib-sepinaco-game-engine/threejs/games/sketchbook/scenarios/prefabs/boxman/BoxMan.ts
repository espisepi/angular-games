import * as CANNON from 'cannon-es';
import * as THREE from 'three';

import { IUpdatable } from '../../../../../engine/interfaces/IUpdatable';
import { LoadingManager } from '../../../../../engine/loading/manager/LoadingManager';
import { UpdatablesManager } from '../../../../../engine/updatables/manager/UpdatablesManager';
import { GraphicsManager } from '../../../../../engine/graphics/manager/GraphicsManager';
import { PhysicsManager } from '../../../../../engine/physics/manager/PhysicsManager';

export class BoxMan implements IUpdatable {
  updateOrder: number = 999;

  private loadingManager: LoadingManager;
  private updatablesManager: UpdatablesManager;
  private graphicsManager: GraphicsManager;
  private physicsManager: PhysicsManager | null | undefined;

  private mesh?: THREE.Mesh;
  private body?: CANNON.Body;

  constructor(
    loadingManager: LoadingManager,
    updatablesManager: UpdatablesManager,
    graphicsManager: GraphicsManager,
    physicsManager: PhysicsManager | null | undefined
  ) {
    this.loadingManager = loadingManager;
    this.updatablesManager = updatablesManager;
    this.graphicsManager = graphicsManager;
    this.physicsManager = physicsManager;

    this.registerUpdatable();
    this.loadGLTF();
    this.loadPhysics();
  }

  private registerUpdatable(): void {
    const updatablesManager = this.getUpdatablesManager();
    updatablesManager.registerUpdatable(this);
  }

  private loadGLTF(): void {
    const loadingManager = this.getLoadingManager();
    const graphicsManager = this.getGraphicsManager();

    if (!loadingManager) return;

    loadingManager.onFinishedCallback = () => {
      console.log('finished loading manager! :)');
    };

    this.getLoadingManager()?.loadGLTF(
      '/assets/models/boxman.glb',
      (gltf: any) => {
        console.log('gltf loaded: ', gltf);

        graphicsManager.add(gltf.scene);

        this.mesh = gltf.scene;
      }
    );
  }

  private loadPhysics(): void {
    const physicsManager = this.getPhysicsManager();
    const world = physicsManager?.getCurrentPhysics()?.getPhysicsWorld();

    if (!physicsManager) return;
    if (!world) return;

    // Create a sphere body
    // const radius = 1 // m
    // const sphereBody = new CANNON.Body({
    //   mass: 5, // kg
    //   shape: new CANNON.Sphere(radius),
    // })
    // sphereBody.position.set(0, 1, 0) // m
    // world.addBody(sphereBody)
    // Box
    const shape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
    this.body = new CANNON.Body({
      mass: 1,
    });
    this.body.addShape(shape);
    this.body.angularVelocity.set(0, 10, 0);
    this.body.angularDamping = 0.5;
    world.addBody(this.body);

    // Create a static plane for the ground
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC, // can also be achieved by setting the mass to 0
      shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0); // make it face up
    world.addBody(groundBody);
  }

  update(timestep: number, unscaledTimeStep: number): void {
    if (this.mesh && this.body) {
      this.mesh.position.copy(this.body.position);
      this.mesh.quaternion.copy(this.body.quaternion);

      // this.getPhysicsManager()?.getPhysicsWorld().fixedStep();
      // console.log(this.body.position)
      // console.log(this.body.quaternion)
    }
  }

  public getGraphicsManager(): GraphicsManager {
    return this.graphicsManager;
  }

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }

  public getLoadingManager(): LoadingManager {
    return this.loadingManager;
  }

  public getPhysicsManager(): PhysicsManager | null | undefined {
    return this.physicsManager;
  }
}
