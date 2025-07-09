const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

const getNotes = () => {
    const data = fs.readFileSync('notes.json', 'utf8');
    return JSON.parse(data || '[]');
};

const saveNotes = (notes) => {
    fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
};

// Get all notes
app.get('/notes', (req, res) => {
    res.json(getNotes());
});

// Add a new note
app.post('/notes', (req, res) => {
    const notes = getNotes();
    const newNote = { id: Date.now(), ...req.body };
    notes.push(newNote);
    saveNotes(notes);
    res.status(201).json(newNote);
});

// Update a note
app.put('/notes/:id', (req, res) => {
    let notes = getNotes();
    const id = Number(req.params.id);
    notes = notes.map(note => note.id === id ? { ...note, ...req.body } : note);
    saveNotes(notes);
    res.json({ message: 'Note updated' });
});

// Delete a note
app.delete('/notes/:id', (req, res) => {
    let notes = getNotes();
    const id = Number(req.params.id);
    notes = notes.filter(note => note.id !== id);
    saveNotes(notes);
    res.json({ message: 'Note deleted' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
