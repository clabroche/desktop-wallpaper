const {ipcRenderer} = require('electron');
const wallpaper = require('./wallpaper')
const helpers = require('./helpers')

const subject = wallpaper.launch()
helpers.trigger()
subject.subscribe(helpers.trigger)



// Right after the line where you changed the document.location
function enlarge() {
  ipcRenderer.send('fullscreen')
}