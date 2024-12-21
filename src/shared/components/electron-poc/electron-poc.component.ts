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
      this.version = version;
    });

    this.electronService.getElectronLog().subscribe((logMessage) => {
      console.log(logMessage);
    });
  }
}
