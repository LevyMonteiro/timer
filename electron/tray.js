const {Tray, Menu, app} = require('electron')
const {resolve} = require('path')
const controlWindow = require('./controlWindow')

const iconPath = resolve(__dirname, '../public/relogio.png')

const createTray = () => {
  const {toggle} = controlWindow()
  
  const tray = new Tray(iconPath)
  
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Timer', type: 'radio',checked: true, click: toggle},
    { label: 'Quit', type: 'radio',checked: true, click: () => app.quit}
  ])
  
  tray.setContextMenu(contextMenu)

  return {tray}
}

module.exports = createTray()