/* eslint-disable*/

import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { DemoComponent, MainComponent } from './component';
import { electronPOCRoutes } from './routes';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [MainComponent, DemoComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild(electronPOCRoutes),
  ],
  providers: [],
  bootstrap: [],
})
export class ElectronPOCModule {}
