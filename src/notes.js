// Notes storage (in-memory for now)
let notes = []

// Create note function
function createNote(title, content) {
    const newNote = {
        id: notes.length + 1,
        title: title,
        content: content,
        createdAt: new Date()
    }
    notes.push(newNote)
    return newNote
}

// Edit note function
function editNote(id, title, content) {
    const note = notes.find(n => n.id === id)
    if (note) {
        note.title = title
        note.content = content
        return note
    }
    return null
}

// Delete note function
function deleteNote(id) {
    const index = notes.findIndex(n => n.id === id)
    if (index !== -1) {
        return notes.splice(index, 1)[0]
    }
    return null
}

// Get all notes function
function getAllNotes() {
    return notes
}

// Get all notes sorted by most recent first
function getAllNotesSorted() {
    return [...notes].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
}

// Get note by ID function
function getNoteById(id) {
    return notes.find(n => n.id === id)
}

// Search notes function (for future use)
function searchNotes(query) {
    const lowercaseQuery = query.toLowerCase()
    return notes.filter(note => 
        note.title.toLowerCase().includes(lowercaseQuery) ||
        note.content.toLowerCase().includes(lowercaseQuery)
    )
}

// Get notes count function
function getNotesCount() {
    return notes.length
}

// Export all functions
module.exports = {
    createNote,
    editNote,
    deleteNote,
    getAllNotes,
    getAllNotesSorted,
    getNoteById,
    searchNotes,
    getNotesCount
} 