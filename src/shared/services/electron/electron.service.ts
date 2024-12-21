import { Injectable, NgZone } from '@angular/core';
import { from, Observable } from 'rxjs';
import { DownloadProgress, ElectronEventFn } from 'types/electron';

const electron = window.electron;

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  constructor(private ngZone: NgZone) {}

  /**
   * Creates an Observable for an Electron event
   * @param eventName - The name of the Electron event to listen to
   * @returns Observable<T> - An observable emitting event data
   */
  private createObservable<
    TKey extends keyof ElectronEventFn,
    TData extends Parameters<Parameters<ElectronEventFn[TKey]>[0]>[1]
  >(eventName: TKey): Observable<TData> {
    return new Observable<TData>((observer) => {
      const handler = (_event: any, data: TData) => {
        this.ngZone.run(() => {
          observer.next(data);
        });
      };

      // Attach the event listener
      electron[eventName](handler);

      // Cleanup function to remove the listener when unsubscribed
      return () => {
        electron.removeListener(eventName, handler);
      };
    });
  }

  appVersion(): Observable<string> {
    return from(electron.getAppVersion());
  }

  getElectronLog() {
    return this.createObservable('onLogFromElectron');
  }

  getDownloadProgress() {
    return this.createObservable('onDownloadProgress');
  }
}
