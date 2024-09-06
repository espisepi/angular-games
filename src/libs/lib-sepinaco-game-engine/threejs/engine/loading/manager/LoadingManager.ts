import { GLTFLoader } from 'three-stdlib';
import { LoadingTrackerEntry } from '../core/LoadingTrackerEntry';
import { UIManager } from '../../ui/manager/UIManager';

export class LoadingManager {
  public firstLoad: boolean = true;
  public onFinishedCallback?: () => void;

  private gltfLoader: GLTFLoader;
  private loadingTracker: LoadingTrackerEntry[] = [];

  constructor() {
    this.gltfLoader = new GLTFLoader();
  }

  public loadGLTF(path: string, onLoadingFinished: (gltf: any) => void): void {
    this.setVisibleUILoading(true);
    let trackerEntry = this.addLoadingEntry(path);

    this.gltfLoader.load(
      path,
      (gltf: any) => {
        onLoadingFinished(gltf);
        this.doneLoading(trackerEntry);
      },
      (xhr: any) => {
        if (xhr.lengthComputable) {
          trackerEntry.progress = xhr.loaded / xhr.total;
        }
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  public addLoadingEntry(path: string): LoadingTrackerEntry {
    let entry = new LoadingTrackerEntry(path);
    this.loadingTracker.push(entry);

    return entry;
  }

  public doneLoading(trackerEntry: LoadingTrackerEntry): void {
    trackerEntry.finished = true;
    trackerEntry.progress = 1;

    if (this.isLoadingDone()) {
      if (this.onFinishedCallback !== undefined) {
        this.onFinishedCallback();
      } else {
        // UIManager.setUserInterfaceVisible(true); // seteado en el metodo setVisibleUILoading
      }

      // UIManager.setLoadingScreenVisible(false);  // seteado en el metodo setVisibleUILoading
      this.setVisibleUILoading(false);
    }
  }

  // public createWelcomeScreenCallback(scenario: Scenario): void
  public createWelcomeScreenCallback(): void {
    if (this.onFinishedCallback === undefined) {
      this.onFinishedCallback = () => {
        // this.world.update(1, 1);
        // Swal.fire({
        // 	title: scenario.descriptionTitle,
        // 	html: scenario.descriptionContent,
        // 	confirmButtonText: 'Play',
        // 	buttonsStyling: false,
        // 	onClose: () => {
        // 		this.world.setTimeScale(1);
        // 		UIManager.setUserInterfaceVisible(true);
        // 	}
        // });
      };
    }
  }

  private getLoadingPercentage(): number {
    let done = true;
    let total = 0;
    let finished = 0;

    for (const item of this.loadingTracker) {
      total++;
      finished += item.progress;
      if (!item.finished) done = false;
    }

    return (finished / total) * 100;
  }

  private isLoadingDone(): boolean {
    for (const entry of this.loadingTracker) {
      if (!entry.finished) return false;
    }
    return true;
  }

  private setVisibleUILoading(isVisible: boolean): void {
    if (isVisible) {
      // this.world.setTimeScale(0);
      UIManager.setUserInterfaceVisible(false);
      UIManager.setLoadingScreenVisible(true);
    } else {
      UIManager.setUserInterfaceVisible(true);
      UIManager.setLoadingScreenVisible(false);
    }
  }
}
