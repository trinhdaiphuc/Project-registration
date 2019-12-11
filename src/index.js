const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");
const mysql = require("mysql");
const config = require("./config/mysql.js");
const connection = mysql.createConnection(config);
const mainMenuTemplate = require("./renderer/menu.js");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      // preload: path.join(__dirname, "./public/js/login.js")
    },
    show: false
  });

  connection.connect(err => {
    if (err == null) {
      console.log("MySQL database connected.");
    } else {
      console.log("[INFO]:::: createWindow -> err", err);
    }
  });

  mainWindow.loadURL(path.join('file://', __dirname, './public/view/index.html'))

  mainWindow.maximize();

  mainWindow.show();

  mainWindow.on("closed", function() {
    app.quit();
  });

  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);

  Menu.setApplicationMenu(mainMenu);
}

// Catch Login
ipcMain.on("login", (e, item) => {
  console.log("[INFO}:::: item", item);
});

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  connection.end();
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

// If Mac, add empty object to menu
if (process.platform == "darwin") {
  mainMenuTemplate.unshift({});
}

if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Developer Tools",
    submenu: [
      {
        label: "Toggle DevTools",
        accelerator: process.platform == "darwin" ? "Command+I" : "Ctrl+I",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        }
      },
      { role: "reload" }
    ]
  });
}
