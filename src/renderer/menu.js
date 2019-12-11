const { app, BrowserWindow } = require("electron");
let createAbout;
function createAboutWindow() {
  createAbout = new BrowserWindow({
    center: true,
    width: 400,
    height: 300
  });

  createAbout.loadFile("./public/view/about.html");

  createAbout.removeMenu();

  createAbout.on("closed", () => {
    createAbout = null;
  });
}

const mainMenuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Exit",
        accelerator: process.platform == "darwin" ? "Command+Q" : "Ctrl+Q",
        click() {
          app.quit();
        }
      }
    ]
  },
  {
    label: "Help",
    submenu: [
      {
        label: "About",
        click() {
          createAboutWindow();
        }
      }
    ]
  }
];

module.exports = mainMenuTemplate;
