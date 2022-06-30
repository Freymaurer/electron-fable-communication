const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            // The __dirname string points to the path of the currently executing script (in this case, your project's root folder).
            // The path.join API joins multiple path segments together, creating a combined path string that works across all platforms.
            preload: path.join(__dirname, 'scripts/preload.js'),
            nodeIntegration: true,
        }
    });

    if (process.env.NODE_ENV === 'development') {
        win.webContents.openDevTools();
        win.loadURL(`http://127.0.01:8080`);
      } else {
        win.loadURL(
          url.format({
              pathname: path.join(__dirname, '../index.html'),
              protocol: 'file:',
              slashes: true
          })
        );
      }
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})