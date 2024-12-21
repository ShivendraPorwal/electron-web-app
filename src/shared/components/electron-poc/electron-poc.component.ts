import { Component } from '@angular/core';
import { ElectronService } from 'shared/services';

@Component({
  selector: 'shared-electron-poc',
  templateUrl: './electron-poc.component.html',
  styleUrls: ['./electron-poc.component.scss'],
})
export class ElectronPocComponent {
  version: string = '';

  constructor(private electronService: ElectronService) {}

  ngOnInit() {
    this.electronService.getAppVersion().subscribe((version) => {
      console.log('Electron version');
      this.version = version;
    });
  }
}
