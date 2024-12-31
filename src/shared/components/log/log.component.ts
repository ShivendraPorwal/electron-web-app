import { Component } from '@angular/core';
import { ElectronService } from '@shared/services';
import { ForceAny } from '@shared/typescript/utility.types';

@Component({
  selector: 'shared-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  standalone: false,
})
export class LogComponent {
  logs: ForceAny[] = [];

  constructor(private electronService: ElectronService) {}

  ngOnInit() {
    this.electronService.getElectronLog().subscribe((log) => {
      this.logs.push(log);
    });
  }

  clearLog() {
    this.logs = [];
  }
}
