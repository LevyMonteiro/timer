const {app, BrowserWindow} = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 520,
    height: 460,
    // show: false,
    frame: false,
    resizable: false,
    fullscreenable: false,
  })
  win.loadURL('http://localhost:6969')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit
})