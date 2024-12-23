import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { DwtAppComponent, DwtComponent, MainComponent } from './component';
import { CallbackPipe, SafeurlPipe } from './pipe';

import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { dwtScannerRoutes } from './routes';
import { DwtService } from './services';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    DwtAppComponent,
    DwtComponent,
    MainComponent,
    CallbackPipe,
    SafeurlPipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    RouterModule.forChild(dwtScannerRoutes),
  ],
  exports: [DwtAppComponent],
  providers: [DwtService],
})
export class DwtScannerModule {}
