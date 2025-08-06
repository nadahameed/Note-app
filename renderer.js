const information = document.getElementById('info')
information.innerText = `This app is using Chrome (v${versions.chrome()}), Node.js (v${versions.node()}), and Electron (v${versions.electron()})`

const func = async () => {
  const response = await window.versions.ping()
  console.log(response) // prints out 'pong'
}

func()

//add event listeners for note actions
document.getElementById('create-note').addEventListener('click', async () => {
  const title = document.getElementById('note-title').value
  const content = document.getElementById('note-content').value
  if (title && content) {
    const newNote = await window.notesAPI.createNote(title, content)
    console.log('Note created:', newNote)
    // Clear the input fields
    document.getElementById('note-title').value = ''
    document.getElementById('note-content').value = ''
  } else {
    alert('Please enter both title and content')
  }
})

document.getElementById('edit-note').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('note-id').value, 10)
  const title = document.getElementById('edit-note-title').value
  const newContent = document.getElementById('new-note-content').value
  if (id && title && newContent) {
    const updatedNote = await window.notesAPI.editNote(id, title, newContent)
    console.log('Note updated:', updatedNote)
    if (updatedNote) {
      // Clear the input fields
      document.getElementById('note-id').value = ''
      document.getElementById('edit-note-title').value = ''
      document.getElementById('new-note-content').value = ''
    } else {
      alert('Note not found')
    }
  } else {
    alert('Please enter ID, title, and content')
  }
})

document.getElementById('delete-note').addEventListener('click', async () => {
  const id = parseInt(document.getElementById('note-id-to-delete').value, 10)
  if (id) {
    const deletedNote = await window.notesAPI.deleteNote(id)
    console.log('Note deleted:', deletedNote)
    if (deletedNote) {
      document.getElementById('note-id-to-delete').value = ''
    } else {
      alert('Note not found')
    }
  } else {
    alert('Please enter a note ID')
  }
})

document.getElementById('get-all-notes').addEventListener('click', async () => {
  const allNotes = await window.notesAPI.getAllNotes()
  console.log('All notes:', allNotes)
  document.getElementById('notes-list').innerHTML = allNotes.map(note => 
    `<li><strong>${note.title}</strong> (ID: ${note.id})<br>${note.content}<br><small>Created: ${note.createdAt}</small></li>`
  ).join('')
})