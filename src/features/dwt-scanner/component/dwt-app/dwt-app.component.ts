import { Component, OnInit, HostListener } from '@angular/core';
import { DwtService } from '../../services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dwt-app',
  templateUrl: './dwt-app.component.html',
  styleUrls: ['./dwt-app.component.scss'],
})
export class DwtAppComponent implements OnInit {
  eventsSubject: Subject<void> = new Subject<void>();

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.eventsSubject.next(event);
  }
  title = 'DWT + Angular Sample';
  version = ' v18.2';
  currentEnv = '';
  bStartUp = true;
  bStartDemo = false;
  bMobile = false;
  bUseCameraViaDirectShow = true;
  constructor(protected dwtService: DwtService) {
    let _this = this;
    dwtService.showStartDemo(function (bShowStartDemo: boolean) {
      _this.bStartDemo = bShowStartDemo;
      //_this.onResize(undefined);
    });
  }

  toggleStartDemo() {
    this.bStartUp = !this.bStartUp;
    this.dwtService.bUseCameraViaDirectShow = this.bUseCameraViaDirectShow;
  }
  ngOnInit() {
    let env = this.dwtService.runningEnvironment;
    if (env.bMobile) {
      this.bMobile = env.bMobile;
      this.currentEnv += env.bChrome ? 'Chrome ' + env.strChromeVersion : '';
      this.currentEnv += env.bFirefox ? 'Firefox ' + env.strFirefoxVersion : '';
      this.currentEnv += env.bSafari ? 'Safari' : '';
    } else {
      this.currentEnv += env.bWin ? 'Windows, ' : '';
      this.currentEnv += env.bLinux ? 'Linux, ' : '';
      this.currentEnv += env.bChrome ? 'Chrome ' + env.strChromeVersion : '';
      this.currentEnv += env.bFirefox ? 'Firefox ' + env.strFirefoxVersion : '';
      this.currentEnv += env.bSafari ? 'Safari' : '';
      this.currentEnv += env.bIE ? 'Internet Explorer' + env.strIEVersion : '';
      this.currentEnv += env.bEdge ? 'Edge' : '';
    }
    let curYear = <HTMLDivElement>document.getElementById('copyRightCurYear');
    curYear.innerHTML = new Date().getFullYear().toString();
  }
}
