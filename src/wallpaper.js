const fse = require('fs-extra')
const config = fse.readJSONSync('../config.json')

const helpers = require('./helpers')
const { Subject } = require('rxjs')
const collections = config.collections

const wallpaper = {}

wallpaper.launch = function() {
  const subject = new Subject()
  this.set().then(_ => subject.next())
  setInterval(_ => {
    this.set().then(_ => subject.next())
  }, config.interval);
  return subject
}
wallpaper.set = async function() {
  const resolution = fse.readJSONSync('./config.json').resolution
  await helpers.bash('cd ' + helpers.imgPath + ' && curl -OL "https://source.unsplash.com/collection/' + collections[Math.random() * collections.length - 1] + '/' + resolution + '"')
  await helpers.bash('gsettings set com.deepin.wrap.gnome.desktop.background picture-uri ' + helpers.imgPath + '/' + resolution)
}

module.exports = wallpaper