const { app, BrowserWindow } = require("electron");
const path = require("path");

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        backgroundColor: "#000000"
    });

    win.loadFile(require("path").join(__dirname, "out/index.html"));
}

app.whenReady().then(createWindow);