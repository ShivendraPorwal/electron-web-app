const { contextBridge, ipcRenderer } = require("electron");

// Expose an API to the renderer process (Angular) securely
contextBridge.exposeInMainWorld("electron", {
  getAppVersion: () => ipcRenderer.invoke("get-app-version"), // IPC message to main process
});
