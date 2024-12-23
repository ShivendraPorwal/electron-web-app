import { Component } from '@angular/core';
import { ElectronService } from 'shared/services';

@Component({
    selector: 'electron-poc-demo',
    templateUrl: './demo.component.html',
    styleUrls: ['./demo.component.scss'],
    standalone: false
})
export class DemoComponent {
  version: string = '0.0.0.0';

  constructor(private electronService: ElectronService) {}

  ngOnInit() {
    this.electronService.appVersion().subscribe((version) => {
      this.version = version;
    });

    this.electronService.getElectronLog().subscribe((logMessage) => {
      console.log(logMessage);
    });
  }
}
