const { BrowserWindow } = require('electron')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 520,
    height: 460,
    show: false,
    frame: false,
    resizable: false,
    fullscreenable: false,
  })

  win.loadURL('http://localhost:6969')

  return {win}
}

module.exports = createWindow()