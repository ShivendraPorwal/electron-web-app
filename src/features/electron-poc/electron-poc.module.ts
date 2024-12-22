import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { DemoComponent, MainComponent } from './component';
import { SharedModule } from 'shared/shared.module';
import { RouterModule } from '@angular/router';
import { electronPOCRoutes } from './routes';

@NgModule({
  declarations: [MainComponent, DemoComponent],
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild(electronPOCRoutes),
  ],
  providers: [],
  bootstrap: [],
})
export class ElectronPOCModule {}
