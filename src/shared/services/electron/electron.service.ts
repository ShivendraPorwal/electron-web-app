import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { DownloadProgress } from 'types/electron';

const electron = window.electron;

type ElectronFn = Window['electron'];

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  getAppVersion() {
    return from(electron.getAppVersion());
  }

  getElectronLog() {
    return new Observable<string>((observer) => {
      electron.onLogFromElectron((_event, logMessage) => {
        observer.next(logMessage);
      });

      return () => {
        electron.removeListener('onLogFromElectron');
      };
    });
  }

  getDownloadProgress() {
    return new Observable<DownloadProgress>((observer) => {
      electron.onDownloadProgress((_event, progress) => {
        observer.next(progress);
      });

      return () => {
        electron.removeListener('onDownloadProgress');
      };
    });
  }
}
