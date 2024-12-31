import { Component } from '@angular/core';
import { ElectronService } from '@shared/services';
import { OsInfo } from '@shared/types';

@Component({
  selector: 'fscc-electron-poc-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss'],
  standalone: false,
})
export class DemoComponent {
  version = '0.0.0.0';
  osInfo!: OsInfo;

  constructor(private electronService: ElectronService) {}

  ngOnInit() {
    this.electronService.appVersion().subscribe((version) => {
      this.version = version;
    });

    this.electronService.getOsInfo().subscribe((osInfo) => {
      this.osInfo = osInfo;
    });

    this.electronService.getElectronLog().subscribe((logMessage) => {
      console.log(logMessage);
    });
  }
}
