// Notes UI Functions

// Function to create HTML for a single note card
function createNoteCard(note) {
    const date = new Date(note.createdAt).toLocaleDateString('en-GB'); // DD/MM/YYYY format
    
    // Truncate content for display (shorter for small cards)
    const contentPreview = note.content.length > 50 ? 
        note.content.substring(0, 50) + '...' : 
        note.content;
    
    return `
        <div class="note-card" onclick="openNoteModal(${note.id})">
            <div class="note-header">${escapeHtml(note.title)}</div>
            <div class="note-content">${escapeHtml(contentPreview)}</div>
            <div class="note-date">${date}</div>
        </div>
    `;
}

// Function to display notes in grid format
function displayNotesGrid(notes) {
    const notesList = document.getElementById('notes-list');
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="text-align: center; color: #6a4c93; font-style: italic; margin-top: 15px; font-size: 8px;">No notes yet. Create your first note above!</p>';
        return;
    }
    
    // Create grid layout with better spacing for small window
    let html = '<div class="notes-grid">';
    for (let note of notes) {
        html += createNoteCard(note);
    }
    html += '</div>';
    
    notesList.innerHTML = html;
}

// Function to open note modal
function openNoteModal(noteId) {
    // Get note data
    const note = window.currentNotes.find(n => n.id === noteId);
    if (!note) return;
    
    const modal = document.getElementById('note-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    modalTitle.textContent = note.title;
    modalContent.innerHTML = note.content.replace(/\n/g, '<br>');
    
    // Store current note ID for editing
    modal.dataset.noteId = noteId;
    
    modal.style.display = 'block';
}

// Function to close note modal
function closeNoteModal() {
    document.getElementById('note-modal').style.display = 'none';
}

// Function to start editing note
function startEditNote() {
    const modal = document.getElementById('note-modal');
    const noteId = modal.dataset.noteId;
    const note = window.currentNotes.find(n => n.id === noteId);
    
    if (!note) return;
    
    // Hide modal content and show edit form
    document.getElementById('modal-content').style.display = 'none';
    document.getElementById('edit-form').style.display = 'block';
    
    // Populate edit form
    document.getElementById('edit-title').value = note.title;
    document.getElementById('edit-content').value = note.content;
}

// Function to save edited note
async function saveEditedNote() {
    const modal = document.getElementById('note-modal');
    const noteId = modal.dataset.noteId;
    const title = document.getElementById('edit-title').value;
    const content = document.getElementById('edit-content').value;
    
    if (!title.trim() || !content.trim()) {
        alert('Please enter both title and content');
        return;
    }
    
    try {
        await window.electronAPI.editNote(noteId, title, content);
        await loadNotes(); // Refresh notes
        closeNoteModal();
    } catch (error) {
        console.error('Error updating note:', error);
        alert('Error updating note');
    }
}

// Function to delete note
async function deleteNote() {
    const modal = document.getElementById('note-modal');
    const noteId = modal.dataset.noteId;
    
    if (!confirm('Are you sure you want to delete this note?')) {
        return;
    }
    
    try {
        await window.electronAPI.deleteNote(noteId);
        await loadNotes(); // Refresh notes
        closeNoteModal();
    } catch (error) {
        console.error('Error deleting note:', error);
        alert('Error deleting note');
    }
}

// Function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Function to create a new note
async function createNote() {
    const title = document.getElementById('new-note-title').value;
    const content = document.getElementById('new-note-content').value;
    
    if (!title.trim() || !content.trim()) {
        alert('Please enter both title and content');
        return;
    }
    
    try {
        await window.electronAPI.createNote(title, content);
        
        // Clear the input fields
        document.getElementById('new-note-title').value = '';
        document.getElementById('new-note-content').value = '';
        
        // Refresh the notes list
        await loadNotes();
    } catch (error) {
        console.error('Error creating note:', error);
        alert('Error creating note');
    }
}

// Function to load and display all notes
async function loadNotes() {
    try {
        const allNotes = await window.electronAPI.getAllNotes();
        window.currentNotes = allNotes; // Store for modal use
        displayNotesGrid(allNotes);
    } catch (error) {
        console.error('Error loading notes:', error);
    }
}

// Function to switch tabs
function switchTab(tabName) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    document.querySelector(`[onclick="switchTab('${tabName}')"]`).classList.add('active');
    
    // Show/hide content based on tab
    if (tabName === 'notes') {
        document.getElementById('notes-content').style.display = 'block';
        document.getElementById('schedule-content').style.display = 'none';
    } else if (tabName === 'schedule') {
        document.getElementById('notes-content').style.display = 'none';
        document.getElementById('schedule-content').style.display = 'block';
    }
}
