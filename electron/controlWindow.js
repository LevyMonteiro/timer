const {screen} = require('electron')


const controlWindow = () => {
  const {win} = require('./createWindow')

  const toggle = () => {
    if(win.isVisible()) {
      win.hide()
    } else {
      show()
    } 
  }

  const show = () => {
    const {x, y} = getDimentions()
    win.setPosition(x - 6, y + 6, false)

    win.show()
    win.focus()
  }

  const getDimentions = () => {
    const {height} = screen.getPrimaryDisplay().workAreaSize
    const {width: boundW, height: boundH} = screen.getPrimaryDisplay().bounds
    
    const x = boundW - win.getSize()[0];
    const y = boundH - height
   
    return {x, y}
  }

  win.on('blur', win.hide)

  return {toggle}
}

module.exports = controlWindow