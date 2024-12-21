import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ElectronPocComponent } from './components';

@NgModule({
  declarations: [ElectronPocComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [],
  exports: [ElectronPocComponent],
})
export class SharedModule {}
