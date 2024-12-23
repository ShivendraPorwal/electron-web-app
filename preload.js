const { contextBridge, ipcRenderer } = require("electron");

/**
 * All the on synchronization from electron
 * IPC message from main process
 */
const ipcOnEvent = {
  onLogFromElectron: (callback) => ipcRenderer.on("log-to-angular", callback), // Listen for logs from Electron
  onDownloadProgress: (callback) =>
    ipcRenderer.on("download-progress", callback), // Listen for progress of app update download
};

/**
 * Render process from web app
 * IPC message to main process
 */
const ipcHandleEvent = {
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
};

// Expose an API to the renderer process (Angular) securely
contextBridge.exposeInMainWorld("electron", {
  ...ipcHandleEvent,
  ...ipcOnEvent,
});

contextBridge.exposeInMainWorld("folderManager", {
  createClientFolder: (clientName) =>
    ipcRenderer.invoke("create-client-folder", clientName),
  viewClientFolders: () => ipcRenderer.invoke("view-client-folders"),
  openFolderDialog: () => ipcRenderer.invoke("dialog:openFolder"),
});
