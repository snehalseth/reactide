const electron = require('electron');
const {BrowserWindow, ipcMain, Menu, app, dialog, globalShortcut} = require('electron');
const url = require('url');
const path = require('path');
const template = require('./menus/file');
const {spawn, exec} = require('child_process');
require('electron-reload')(path.join(__dirname, '../'));

app.on('ready', () => {
  let win = new BrowserWindow({
    width: 1000,
    height: 800
  });
  win.loadURL('file://' + path.join(__dirname, '../renderer/index.html'));
  let menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
  globalShortcut.register('CommandOrControl+Alt+I', () => {
    win.toggleDevTools();
  });
  // let spawnOfHell = spawn('ls', {
  //   cwd:path.join(__dirname, '../lib/temp/new-project'),
  //   shell:true,
  // });
  let spawnOfHeaven = exec('NODE_ENV="production"', {
    cwd: path.join(__dirname, '../lib/temp/new-project')
  }, (err, stdout, stderr) => {
    console.log('err:', err);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
    let child = new BrowserWindow({
      width: 800,
      height: 600
    });
    child.loadURL('file://' + path.join(__dirname, '../lib/temp/new-project/client/public/index.html'));
  })
  // console.log(spawnOfHell);
  // module.exports = win;
});

ipcMain.on('hello', (event, arg) => {
  console.log(arg);
  event.sender.send('reply', 'hello');
  event.returnValue = 'HI';
})

