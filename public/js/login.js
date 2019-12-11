const electron = require("electron");
const ipcRenderer = electron.ipcRenderer
const form = $("from");

form.addEventListener("submit", e => {
  e.preventDefault();
  const username = $("#userName").value;
  const password = $("#userPassword").value;
  const login = {
    username,
    password
  };
  ipcRenderer.send("login", login);
});
