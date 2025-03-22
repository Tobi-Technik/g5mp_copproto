const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        devTools: true // Deaktiviert DevTools
    }
});


    win.loadURL(`file://${path.join(__dirname, 'dist', 'index.html')}`);
}

app.whenReady().then(createWindow);
