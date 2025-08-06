const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  node: () => process.versions.node,
  chrome: () => process.versions.chrome,
  electron: () => process.versions.electron,
  ping: () => ipcRenderer.invoke('ping')
  // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('notesAPI', {
    createNote: (title, content) => ipcRenderer.invoke('create-note', title, content),
    editNote: (id, title, newContent) => ipcRenderer.invoke('edit-note', id, title, newContent),
    deleteNote: (id) => ipcRenderer.invoke('delete-note', id),
    getAllNotes: () => ipcRenderer.invoke('get-all-notes')
})