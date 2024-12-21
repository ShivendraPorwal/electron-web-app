const { contextBridge, ipcRenderer } = require("electron");

// Expose an API to the renderer process (Angular) securely
contextBridge.exposeInMainWorld("electron", {
  getAppVersion: () => ipcRenderer.invoke("get-app-version"), // IPC message to main process
  onLogFromElectron: (callback) => ipcRenderer.on("log-to-angular", callback), // Listen for logs from Electron
  onDownloadProgress: (callback) =>
    ipcRenderer.on("download-progress", callback), // Listen for progress of app update download
});
