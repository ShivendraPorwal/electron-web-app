import { NgModule } from '@angular/core';
import { FileExplorerComponent, DownloadProgressComponent } from './components';

import { FormsModule } from '@angular/forms';

import { ElectronService, FolderService } from './services';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { LogComponent } from './components/log/log.component';

@NgModule({
  declarations: [
    DownloadProgressComponent,
    FileExplorerComponent,
    LogComponent,
  ],
  imports: [CommonModule, FormsModule, ButtonModule, InputTextModule],
  providers: [FolderService, ElectronService],
  bootstrap: [],
  exports: [DownloadProgressComponent, FileExplorerComponent, LogComponent],
})
export class SharedModule {}
