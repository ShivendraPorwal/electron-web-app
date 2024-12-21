const { app, BrowserWindow, globalShortcut, ipcMain } = require("electron");
const path = require("path");

let mainWindow;

const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"), // Ensure preload.js is in the correct path
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Enable contextIsolation for security
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:4200"); // Angular dev server
    mainWindow.webContents.openDevTools(); // Open DevTools in development mode
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist/index.html")); // Adjust path for production build
  }

  // Listen for a message from the renderer process (Angular)
  ipcMain.handle("get-app-version", () => {
    console.log("Received message from renderer process", "get-app-version"); // Log message in console
    return app.getVersion(); // Send back app version
  });
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Register global shortcut to open/close DevTools
app.whenReady().then(() => {
  globalShortcut.register("CommandOrControl+Shift+I", () => {
    if (mainWindow) {
      const isOpen = mainWindow.webContents.isDevToolsOpened();
      if (isOpen) {
        mainWindow.webContents.closeDevTools();
      } else {
        mainWindow.webContents.openDevTools();
      }
    }
  });
});
