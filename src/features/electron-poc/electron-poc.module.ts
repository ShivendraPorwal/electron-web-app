import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'shared/shared.module';
import { DemoComponent, MainComponent } from './component';
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
