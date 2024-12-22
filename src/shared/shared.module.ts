import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileExplorerComponent, DownloadProgressComponent } from './components';

import { FormsModule } from '@angular/forms';

import { ElectronService, FolderService } from './services';

@NgModule({
  declarations: [DownloadProgressComponent, FileExplorerComponent],
  imports: [BrowserModule, FormsModule],
  providers: [FolderService, ElectronService],
  bootstrap: [],
  exports: [DownloadProgressComponent, FileExplorerComponent],
})
export class SharedModule {}
