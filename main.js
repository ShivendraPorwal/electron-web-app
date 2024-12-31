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
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true, // Enable contextIsolation for security
    },
  });

  if (isDev) {
    mainWindow.loadURL("http://localhost:4200"); // Angular dev server
    mainWindow.webContents.openDevTools(); // Open DevTools in development mode
  } else {
    mainWindow.loadFile(
      path.join(__dirname, "dist/fscc-app/browser/index.html") // Angular build file path
    );
  }
}

// ------------------  Listen for a message from the renderer process (Angular) --------------------------------

ipcMain.handle("get-app-version", () => {
  logToApp("Getting version information");
  return app.getVersion(); // Send back app version
});
// Open folder dialog when requested
ipcMain.handle("dialog:open-folder", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  return result.filePaths[0]; // Return the selected folder path
});

/**
 * @description
 *
 * Check for updates
 * To download the latest version of the build
 * Mac update won't work unless it is signed @see {https://medium.com/@johndyer24/creating-and-deploying-an-auto-updating-electron-app-for-mac-and-windows-using-electron-builder-6a3982c0cee6}
 * FIXME: This need to be worked upon and tested
 */
function checkForUpdates() {
  // autoUpdater.setFeedURL({ url: feedURL });
  // autoUpdater.checkForUpdates();
  autoUpdater.requestHeaders = {
    "PRIVATE-TOKEN": "glpat-PNTkPEEe2wVtDs4uHN9s",
  };

  autoUpdater.setFeedURL({
    provider: "generic",
    url: "https://gitlab.com/api/v4/projects/65720678/jobs/artifacts/master/raw/dist?job=build",
  });

  autoUpdater.forceDevUpdateConfig = true;
  autoUpdater.autoDownload = false;

  // Check for updates
  autoUpdater.checkForUpdates();

  // Handle the 'update-available' event
  autoUpdater.on("update-available", (info) => {
    logToApp("update-available", info);
    dialog
      .showMessageBox(mainWindow, {
        type: "info",
        title: "Update Available",
        message: "An update is available. It will be downloaded and installed.",
        buttons: ["Download", "Cancel"],
      })
      .then((result) => {
        const { response } = result;

        if (response === 0) {
          logToApp("User clicked Install, starting the update...");
          autoUpdater.downloadUpdate();
        } else {
          logToApp("User clicked Cancel, update will not proceed.");
        }
      })
      .catch((err) => {
        console.error("Error showing message box: ", err);
      });
  });

  autoUpdater.on("update-not-available", () => {
    logToApp("update-not-available");

    dialog.showMessageBox(mainWindow, {
      type: "info",
      title: "No Updates",
      message: "You are using the latest version.",
    });
  });

  autoUpdater.on("download-progress", (progressObj) => {
    logToApp(progressObj);

    const { percent, transferred, total, bytesPerSecond } = progressObj;

    emitEventToApp("download-progress", {
      percent: +percent.toFixed(2), // %,
      transferred: (transferred / 1024 / 1024).toFixed(2), // MB`,
      total: (total / 1024 / 1024).toFixed(2), // MB`,
      speed: (bytesPerSecond / 1024).toFixed(2), // KB/s`,
    });
  });

  autoUpdater.on("update-downloaded", () => {
    dialog
      .showMessageBox({
        type: "question",
        buttons: ["Restart", "Later"],
        defaultId: 0,
        title: "Update Ready",
        message: "An update has been downloaded. Restart to apply it?",
      })
      .then((result) => {
        if (result.response === 0) {
          logToApp("Update Downloaded: Quit and Install");
          autoUpdater.autoRunAppAfterInstall = true;
          autoUpdater.quitAndInstall();
        } else {
          logToApp("Update Downloaded: Install later");
        }
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
  return message;
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

    return logToApp(`Client folder created for ${clientName}.`);
  } else {
    return logToApp(`Client folder for ${clientName} already exists.`);
  }
}

function selectDirectory() {
  const result = dialog.showOpenDialogSync({
    properties: ["openDirectory"], // Allow only directories to be selected
    title: "Select a Directory",
    buttonLabel: "Select",
  });

  if (result && result.length > 0) {
    return result[0]; // Return the selected directory path
  } else {
    return null; // No directory selected
  }
}

function createClientFolderInSelectedDirectory(clientName) {
  const selectedDirectory = selectDirectory();

  if (!selectedDirectory) {
    return logToApp("No directory selected.");
  }

  const newFolderPath = path.join(selectedDirectory, clientName);

  if (!fs.existsSync(newFolderPath)) {
    fs.mkdirSync(newFolderPath);

    return logToApp(
      `Client Folder "${clientName}" created in ${selectedDirectory}.`
    );
  } else {
    return logToApp(
      `Client Folder "${clientName}" already exists in ${selectedDirectory}.`
    );
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
    .map((entry) => path.join(baseFolder, entry.name)); // Return full paths
}

function deleteClientFolder(clientName) {
  const baseFolder = path.join(app.getPath("userData"), "clients");
  const folderPath = path.join(baseFolder, clientName);

  if (!fs.existsSync(folderPath)) {
    return logToApp(`Client Folder "${folderPath}" does not exist.`);
  }

  // Confirm deletion
  const result = dialog.showMessageBoxSync({
    type: "warning",
    title: "Confirm Deletion",
    message: `Are you sure you want to delete the folder "${folderPath}"? This action cannot be undone.`,
    buttons: ["Yes", "No"],
    defaultId: 1, // Default to "No"
  });

  if (result === 0) {
    try {
      fs.rmSync(folderPath, { recursive: true, force: true });
      return logToApp(`Folder "${folderPath}" has been deleted.`);
    } catch (err) {
      return logToApp(
        `Failed to delete folder "${folderPath}". Error: ${err.message}`
      );
    }
  } else {
    return logToApp(`Folder deletion canceled.`);
  }
}

ipcMain.handle("client-folder:create", (_event, clientName) => {
  logToApp("Create client folder");
  return createClientFolder(clientName);
});

ipcMain.handle("client-folder:view", () => {
  logToApp("view client folder");
  return viewClientFolders();
});

ipcMain.handle("client-folder:select-and-create", (_event, clientName) => {
  logToApp(`Select and create client folder for ${clientName}`);
  return createClientFolderInSelectedDirectory(clientName);
});

ipcMain.handle("client-folder:delete", (_event, folderPath) => {
  logToApp(`Delete client folder: ${folderPath}`);
  return deleteClientFolder(folderPath);
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
          dialog
            .showMessageBox(mainWindow, {
              type: "info",
              title: "Test Dialogue",
              message: "Something is wrong. Try it again",
              buttons: ["Okay", "Cancel"],
            })
            .then((result) => {
              const { response } = result;

              if (response === 0) {
                logToApp("User clicked Confirm, starting the process...");
              } else {
                logToApp("User clicked Cancel, will not proceed...");
              }
            })
            .catch((err) => {
              console.error("Error showing message box: ", err);
            });
        },
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(template);
Menu.setApplicationMenu(menu);
