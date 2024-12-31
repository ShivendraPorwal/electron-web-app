import { Injectable, NgZone } from '@angular/core';
import { ForceAny } from '@shared/typescript';
import { ElectronOnEventFn } from 'src/types/electron.type';
import { from, Observable } from 'rxjs';
import { OsInfo } from '@shared/types';

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
  createObservable<
    TKey extends keyof ElectronOnEventFn,
    TData extends Parameters<Parameters<ElectronOnEventFn[TKey]>[0]>[1]
  >(eventName: TKey): Observable<TData> {
    return new Observable<TData>((observer) => {
      const handler = (_event: ForceAny, data: TData) => {
        this.ngZone.run(() => {
          observer.next(data);
        });
      };

      // Attach the event listener
      void electron[eventName](handler);

      // Cleanup function to remove the listener when unsubscribed
      return () => {
        void electron.removeListener(eventName, handler);
      };
    });
  }

  appVersion(): Observable<string> {
    return from(electron.getAppVersion());
  }

  getOsInfo(): Observable<OsInfo> {
    return from(electron.getOsInfo());
  }

  getElectronLog() {
    return this.createObservable('onLogFromElectron');
  }

  getDownloadProgress() {
    return this.createObservable('onDownloadProgress');
  }

  getRouteChange() {
    return this.createObservable('onRouteChange');
  }
}
