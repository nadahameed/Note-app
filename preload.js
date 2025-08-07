const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    createNote: (title, content) => ipcRenderer.invoke('create-note', title, content),
    editNote: (id, title, content) => ipcRenderer.invoke('edit-note', id, title, content),
    deleteNote: (id) => ipcRenderer.invoke('delete-note', id),
    getAllNotes: () => ipcRenderer.invoke('get-all-notes')
})