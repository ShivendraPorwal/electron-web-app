import { Component, OnInit } from '@angular/core';
import { ElectronService } from '@shared/services';
import { ForceAny } from '@shared/typescript/utility.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit {
  title = 'angular-electron-app';
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
