const { app, BrowserWindow } = require("electron");
const path = require("path");
const mysql = require("mysql");
const config = require("./config/mysql.json");
const connection = mysql.createConnection(config);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    center: true,
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "main/preload.js"),
    },
  });

  mainWindow.loadFile("./public/view/index.html");

  mainWindow.on("closed", function() {
    mainWindow = null;
  });
  mainWindow.maximize();
}

app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", function() {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});

app.on("activate", function() {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});
