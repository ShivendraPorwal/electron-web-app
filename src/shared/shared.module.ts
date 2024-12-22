import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ElectronPocComponent,
  FileExplorerComponent,
  DownloadProgressComponent,
} from './components';

import { FormsModule } from '@angular/forms';

import { ElectronService, FolderService } from './services';

@NgModule({
  declarations: [
    ElectronPocComponent,
    DownloadProgressComponent,
    FileExplorerComponent,
  ],
  imports: [BrowserModule, FormsModule],
  providers: [FolderService, ElectronService],
  bootstrap: [],
  exports: [ElectronPocComponent],
})
export class SharedModule {}
