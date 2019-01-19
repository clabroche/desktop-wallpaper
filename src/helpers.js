const { exec } = require('child_process')
const pathfs = require('path')
const fse = require('fs-extra')
const config = require('../config.json')

const helpers = {
  imgPath: pathfs.resolve(__dirname, '..', '..', 'img'),
  trigger: function () {
    const resolution = fse.readJsonSync('./config.json').resolution
    const body = document.querySelector('body')
    const img = document.querySelector('img')
    img.classList.add('remove')
  
    const newImage = document.createElement("IMG");
    newImage.classList.add('insert')
    const url = pathfs.resolve(__dirname, '..', '..', 'img') + '/' + resolution + "?" + new Date().getTime()
    newImage.setAttribute('src', url)
    setTimeout(_ => img.remove(), 1000)
    body.appendChild(newImage)
  },
  bash: function(cmd) {
    return new Promise((resolve, reject) => exec(cmd, (a,b,c) => {
      resolve()
    }));

  }
}
module.exports = helpers