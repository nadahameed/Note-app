const {app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

// Import notes functions
const notes = require('./src/notes.js')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 500,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        }
    })

    win.loadFile('index.html')
}

// Handle IPC calls
ipcMain.handle('create-note', (event, title, content) => notes.createNote(title, content))
ipcMain.handle('edit-note', (event, id, title, content) => notes.editNote(id, title, content))
ipcMain.handle('delete-note', (event, id) => notes.deleteNote(id))
ipcMain.handle('get-all-notes', () => notes.getAllNotesSorted())

app.whenReady().then(() => {
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