import { Component } from '@angular/core';
import { ElectronService, FolderService } from '@shared/services';

@Component({
  selector: 'shared-file-explorer',
  templateUrl: './file-explorer.component.html',
  styleUrls: ['./file-explorer.component.scss'],
  standalone: false,
})
export class FileExplorerComponent {
  clientName = '';
  message = '';
  folders: string[] = [];
  selectedFolder = '';

  constructor(
    private folderService: FolderService,

    private electronService: ElectronService
  ) {}

  createFolder() {
    if (this.clientName.trim()) {
      void this.folderService
        .createClientFolder(this.clientName)
        .then((msg) => {
          this.message = msg;
          this.fetchFolders();
        });
    }
  }

  selectAndCreateFolder() {
    if (this.clientName.trim()) {
      void this.folderService
        .selectAndCreateClientFolder(this.clientName)
        .then((msg) => {
          this.message = msg;
          this.fetchFolders();
        });
    }
  }

  deleteClientFolder(clientPath: string) {
    this.electronService.getOsInfo().subscribe(({ type }) => {
      const clientName = clientPath.substring(
        clientPath.lastIndexOf(type === 'Darwin' ? '/' : '\\') + 1
      );
      void this.folderService.deleteClientFolder(clientName).then((msg) => {
        this.message = msg;
        this.fetchFolders();
      });
    });
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
    void this.folderService.viewClientFolders().then((folders) => {
      this.folders = folders;
    });
  }

  ngOnInit() {
    this.fetchFolders();
  }
}
