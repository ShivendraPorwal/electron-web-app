import { Component } from '@angular/core';
import { FolderService } from 'shared/services';

@Component({
  selector: 'shared-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
})
export class FileExplorerComponent {
  clientName = '';
  message = '';
  folders: string[] = [];
  selectedFolder: string = '';

  constructor(private folderService: FolderService) {}

  createFolder() {
    if (this.clientName.trim()) {
      this.folderService.createClientFolder(this.clientName).then((msg) => {
        this.message = msg;
        this.fetchFolders();
      });
    }
  }

  selectFolder(): void {
    this.folderService
      .openFolderDialog()
      .then((folderPath) => {
        this.selectedFolder = folderPath; // Set the selected folder path
      })
      .catch((error) => {
        console.error('Failed to open folder dialog', error);
      });
  }

  fetchFolders() {
    this.folderService.viewClientFolders().then((folders) => {
      this.folders = folders;
    });
  }

  ngOnInit() {
    this.fetchFolders();
  }
}
