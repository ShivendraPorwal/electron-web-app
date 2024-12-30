import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FolderService {
  createClientFolder(clientName: string): Promise<string> {
    return window.folderManager.createClientFolder(clientName);
  }

  viewClientFolders(): Promise<string[]> {
    return window.folderManager.viewClientFolders();
  }

  openFolderDialog(): Promise<string> {
    return window.folderManager.openFolderDialog(); // Call Electron's dialog
  }

  selectAndCreateClientFolder(clientName: string): Promise<string> {
    return window.folderManager.selectAndCreateClientFolder(clientName);
  }

  deleteClientFolder(clientName: string): Promise<string> {
    return window.folderManager.deleteClientFolder(clientName);
  }
}
