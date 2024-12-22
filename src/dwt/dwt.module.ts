import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DwtAppComponent } from './component/dwt-app/dwt-app.component';
import { DwtComponent } from './component';
import { CallbackPipe } from './callback.pipe';
import { SafeurlPipe } from './safeurl.pipe';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [DwtAppComponent, DwtComponent, CallbackPipe, SafeurlPipe],
  imports: [BrowserModule, FormsModule, NgbModule],
  exports: [DwtAppComponent],
  providers: [],
})
export class DwtModule {}
