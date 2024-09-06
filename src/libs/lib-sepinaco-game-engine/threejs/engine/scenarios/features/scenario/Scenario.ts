import * as THREE from 'three';
import { GraphicsManager } from '../../../graphics/manager/GraphicsManager';
import { UpdatablesManager } from '../../../updatables/manager/UpdatablesManager';
import { BoxMesh } from '../../prefabs/box/BoxMesh';
import { LoadingManager } from '../../../loading/manager/LoadingManager';

// TODO: Esto tiene que ser muy basica para sustituirlo
// por el de ScenarioSketchbook en el game de Sketchbook

// Se encarga de instanciar y anadir a graphicsManager todos los objetos
export class Scenario {
  private graphicsManager: GraphicsManager;
  private updatablesManager: UpdatablesManager;
  private loadingManager: LoadingManager;

  constructor(
    graphicsManager: GraphicsManager,
    updatablesManager: UpdatablesManager,
    loadingManager: LoadingManager
  ) {
    this.graphicsManager = graphicsManager;
    this.updatablesManager = updatablesManager;
    this.loadingManager = loadingManager;

    this.initLights();
    this.initObjects();
  }

  // override this method to create custom lights
  protected initLights(): void {
    // light
    const light = new THREE.AmbientLight();
    this.graphicsManager.add(light);
  }

  // override this method to create custom objects
  protected initObjects(): void {
    // create mesh
    const mesh = new BoxMesh();
    this.updatablesManager.registerUpdatable(mesh);
    this.graphicsManager.add(mesh);
  }

  // Public methods ========================

  public getGraphicsWorld(): GraphicsManager {
    return this.graphicsManager;
  }

  public getUpdatablesManager(): UpdatablesManager {
    return this.updatablesManager;
  }

  public getLoadingManager(): LoadingManager {
    return this.loadingManager;
  }
}

// import { ISpawnPoint } from '../interfaces/ISpawnPoint';
// import { VehicleSpawnPoint } from './VehicleSpawnPoint';
// import { CharacterSpawnPoint } from './CharacterSpawnPoint';
// import { World } from '../world/World';
// import { LoadingManager } from '../core/LoadingManager';

// export class Scenario
// {
// 	public id: string;
// 	public name: string;
// 	public spawnAlways: boolean = false;
// 	public default: boolean = false;
// 	public world: World;
// 	public descriptionTitle: string;
// 	public descriptionContent: string;

// 	private rootNode: THREE.Object3D;
// 	private spawnPoints: ISpawnPoint[] = [];
// 	private invisible: boolean = false;
// 	private initialCameraAngle: number;

// 	constructor(root: THREE.Object3D, world: World)
// 	{
// 		this.rootNode = root;
// 		this.world = world;
// 		this.id = root.name;

// 		// Scenario
// 		if (root.userData.hasOwnProperty('name'))
// 		{
// 			this.name = root.userData.name;
// 		}
// 		if (root.userData.hasOwnProperty('default') && root.userData.default === 'true')
// 		{
// 			this.default = true;
// 		}
// 		if (root.userData.hasOwnProperty('spawn_always') && root.userData.spawn_always === 'true')
// 		{
// 			this.spawnAlways = true;
// 		}
// 		if (root.userData.hasOwnProperty('invisible') && root.userData.invisible === 'true')
// 		{
// 			this.invisible = true;
// 		}
// 		if (root.userData.hasOwnProperty('desc_title'))
// 		{
// 			this.descriptionTitle = root.userData.desc_title;
// 		}
// 		if (root.userData.hasOwnProperty('desc_content'))
// 		{
// 			this.descriptionContent = root.userData.desc_content;
// 		}
// 		if (root.userData.hasOwnProperty('camera_angle'))
// 		{
// 			this.initialCameraAngle = root.userData.camera_angle;
// 		}

// 		if (!this.invisible) this.createLaunchLink();

// 		// Find all scenario spawns and enitites
// 		root.traverse((child) => {
// 			if (child.hasOwnProperty('userData') && child.userData.hasOwnProperty('data'))
// 			{
// 				if (child.userData.data === 'spawn')
// 				{
// 					if (child.userData.type === 'car' || child.userData.type === 'airplane' || child.userData.type === 'heli')
// 					{
// 						let sp = new VehicleSpawnPoint(child);

// 						if (child.userData.hasOwnProperty('type'))
// 						{
// 							sp.type = child.userData.type;
// 						}

// 						if (child.userData.hasOwnProperty('driver'))
// 						{
// 							sp.driver = child.userData.driver;

// 							if (child.userData.driver === 'ai' && child.userData.hasOwnProperty('first_node'))
// 							{
// 								sp.firstAINode = child.userData.first_node;
// 							}
// 						}

// 						this.spawnPoints.push(sp);
// 					}
// 					else if (child.userData.type === 'player')
// 					{
// 						let sp = new CharacterSpawnPoint(child);
// 						this.spawnPoints.push(sp);
// 					}
// 				}
// 			}
// 		});
// 	}

// 	public createLaunchLink(): void
// 	{
// 		this.world.params[this.name] = () =>
// 		{
// 			this.world.launchScenario(this.id);
// 		};
// 		this.world.scenarioGUIFolder.add(this.world.params, this.name);
// 	}

// 	public launch(loadingManager: LoadingManager, world: World): void
// 	{
// 		this.spawnPoints.forEach((sp) => {
// 			sp.spawn(loadingManager, world);
// 		});

// 		if (!this.spawnAlways)
// 		{
// 			loadingManager.createWelcomeScreenCallback(this);

// 			world.cameraOperator.theta = this.initialCameraAngle;
// 			world.cameraOperator.phi = 15;
// 		}
// 	}
// }
