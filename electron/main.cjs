const {app, BrowserWindow } = require('electron')

const App = () => {
  const {win} = require('./createWindow')
  const {tray} = require('./tray.js')
}

app.whenReady().then(() => {
  App()

  app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if(process.platform !== 'darwin') app.quit
})

module.exports = App