import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FileExplorerComponent, DownloadProgressComponent } from './components';

import { FormsModule } from '@angular/forms';

import { ElectronService, FolderService } from './services';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [DownloadProgressComponent, FileExplorerComponent],
  imports: [CommonModule, FormsModule],
  providers: [FolderService, ElectronService],
  bootstrap: [],
  exports: [DownloadProgressComponent, FileExplorerComponent],
})
export class SharedModule {}
