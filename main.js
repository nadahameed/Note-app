const {app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    win.loadFile('index.html')
}

//notes logic functions
const { ipcMain } = require('electron');
const notes = require('./src/notes.js');

ipcMain.handle('create-note', (event, title, content) => notes.createNote(title, content));
ipcMain.handle('edit-note', (event, id, title, newContent) => notes.editNote(id, title, newContent));
ipcMain.handle('delete-note', (event, id) => notes.deleteNote(id));
ipcMain.handle('get-all-notes', () => notes.getAllNotes());

app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()

    app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})