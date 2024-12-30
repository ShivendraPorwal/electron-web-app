import { NgModule } from '@angular/core';
import { FileExplorerComponent, DownloadProgressComponent } from './components';

import { FormsModule } from '@angular/forms';

import { ElectronService, FolderService } from './services';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [DownloadProgressComponent, FileExplorerComponent],
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  providers: [FolderService, ElectronService],
  bootstrap: [],
  exports: [DownloadProgressComponent, FileExplorerComponent],
})
export class SharedModule {}
