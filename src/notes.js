//notes functions
let notes = [];

//create note
function createNote(title, content) {
    const newNote = {
        id: notes.length + 1,
        title: title,
        content: content,
        createdAt: new Date()
    };
    notes.push(newNote);
    return newNote;
}

//edit note
function editNote(id, title, newContent) {
    const note = notes.find(n => n.id === id);
    if (note) {
        note.title = title;
        note.content = newContent;
        return note;
    }
    return null;
}

//delete note
function deleteNote(id) {
    const index = notes.findIndex(n => n.id === id);
    if (index !== -1) {
        return notes.splice(index, 1)[0];
    }
    return null;
}

//get all notes
function getAllNotes() {
    return notes;
}

module.exports = {
    createNote,
    editNote,
    deleteNote,
    getAllNotes
};

