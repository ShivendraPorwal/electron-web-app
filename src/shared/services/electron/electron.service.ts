import { Injectable } from '@angular/core';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  getAppVersion() {
    return from(window.electron.getAppVersion());
  }
}
