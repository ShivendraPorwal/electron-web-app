const { app, Menu, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");
const { autoUpdater } = require("electron-updater");

let mainWindow;

const isDev = process.env.NODE_ENV === "development" || !app.isPackaged;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
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
    mainWindow.loadFile(
      path.join(__dirname, "dist/angular-electron-app/index.html")
    );
  }
}

// ------------------  Listen for a message from the renderer process (Angular) --------------------------------

ipcMain.handle("get-app-version", () => {
  logToApp("Getting version information");
  return app.getVersion(); // Send back app version
});
// Open folder dialog when requested
ipcMain.handle("dialog:openFolder", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0]; // Return the selected folder path
});

// FIXME: This need to be worked upon and tested
// TODO: Handle close if download is in progress
function checkForUpdates() {
  // autoUpdater.setFeedURL({ url: feedURL });
  // autoUpdater.checkForUpdates();

  // Check for updates
  autoUpdater.checkForUpdatesAndNotify();

  // Handle the 'update-available' event
  autoUpdater.on("update-available", () => {
    logToApp("update-available");
    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "Update Available",
      message: "An update is available. It will be downloaded and installed.",
    });
  });

  // Handle the 'update-not-available' event
  autoUpdater.on("update-not-available", () => {
    logToApp("update-not-available");

    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "No Updates",
      message: "You are using the latest version.",
    });
  });

  // Handle the 'download-progress' event
  autoUpdater.on("download-progress", (progressObj) => {
    logToApp(progressObj);

    const { percent, transferred, total, bytesPerSecond } = progressObj;

    // Create or update the progress dialog

    emitEventToApp("download-progress", {
      percent: +percent.toFixed(2),
      transferred: (transferred / 1024 / 1024).toFixed(2), //} MB`,
      total: (total / 1024 / 1024).toFixed(2), //} MB`,
      speed: (bytesPerSecond / 1024).toFixed(2), //} KB/s`,
    });
  });

  // Handle the 'update-downloaded' event
  autoUpdater.on("update-downloaded", (info) => {
    dialog
      .showMessageBox(mainWindow, {
        type: "info",
        title: "Update Ready",
        message: "Update downloaded. The app will restart to apply the update.",
      })
      .then(() => {
        autoUpdater.quitAndInstall();
      });
  });

  autoUpdater.on("error", (err) => {
    logToApp("Error Checking update");
    logToApp(err);
    console.error(err);
  });
}

function emitEventToApp(event, data) {
  mainWindow.webContents.send(event, data);
}

function logToApp(message) {
  console.info(message);
  emitEventToApp("log-to-angular", { message }); // Send log to Angular
}

/**
 * When app is ready
 */
app.on("ready", () => {
  createWindow();
  checkForUpdates();
});

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

/**
 * Dev tool
 * TODO: Disable in production
 */
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

// --------------- Client Folder ----------------

function createClientFolder(clientName) {
  const baseFolder = path.join(app.getPath("userData"), "clients");
  const clientFolder = path.join(baseFolder, clientName);

  if (!fs.existsSync(baseFolder)) {
    fs.mkdirSync(baseFolder);
  }

  if (!fs.existsSync(clientFolder)) {
    fs.mkdirSync(clientFolder);
    return `Client folder created for ${clientName}.`;
  } else {
    return `Client folder for ${clientName} already exists.`;
  }
}

function viewClientFolders() {
  const baseFolder = path.join(app.getPath("userData"), "clients");

  if (!fs.existsSync(baseFolder)) {
    return [];
  }

  return fs
    .readdirSync(baseFolder, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);
}

// IPC Handlers
ipcMain.handle("create-client-folder", (_event, clientName) => {
  logToApp("Create client folder");
  return createClientFolder(clientName);
});

ipcMain.handle("view-client-folders", () => {
  logToApp("view client folder");
  return viewClientFolders();
});

// --------------- Menu --------------------

const template = [
  {
    label: "Main",
    submenu: [
      {
        label: "Menu 1",
        click: () => {
          logToApp("Menu 1 clicked");
        },
      },
      {
        label: "Check for updates",
        click: () => {
          autoUpdater.checkForUpdates();
        },
      },
    ],
  },
  {
    label: "Other Menu",
    submenu: [
      {
        label: "Test Menu 1",
        click: () => {
          logToApp("Test Menu 1 clicked");
        },
      },
      {
        label: "Test Menu 2",
        click: () => {
          logToApp("Test Menu 2 clicked");
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
