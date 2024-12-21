import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ElectronPocComponent } from './components';
import { DownloadProgressComponent } from './components/download-progress/download-progress.component';

@NgModule({
  declarations: [ElectronPocComponent, DownloadProgressComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [],
  exports: [ElectronPocComponent],
})
export class SharedModule {}
