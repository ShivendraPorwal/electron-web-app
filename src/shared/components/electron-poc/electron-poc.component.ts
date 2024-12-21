import { Component } from '@angular/core';
import { ElectronService } from 'shared/services';

@Component({
  selector: 'shared-electron-poc',
  templateUrl: './electron-poc.component.html',
  styleUrls: ['./electron-poc.component.scss'],
})
export class ElectronPocComponent {
  version: string = '123';

  constructor(private electronService: ElectronService) {}

  ngOnInit() {
    this.electronService.appVersion().subscribe((version) => {
      this.version = version;
    });

    this.electronService.getElectronLog().subscribe((logMessage) => {
      console.log(logMessage);
    });

    setTimeout(() => {
      this.version = `v120100`;
    }, 5000);
  }

  handle() {
    console.log('speed', this.version);
    this.version = `v100`;
  }
}
