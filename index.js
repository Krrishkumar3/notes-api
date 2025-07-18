const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

const fs = require('fs');

if (!fs.existsSync('notes.json')) {
  fs.writeFileSync('notes.json', '[]');
}

app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Serve frontend

// Read notes
app.get('/notes', (req, res) => {
  const data = fs.readFileSync('notes.json');
  res.json(JSON.parse(data));
});

// Add note
app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  const notes = JSON.parse(fs.readFileSync('notes.json'));
  const newNote = { id: Date.now(), title, content };
  notes.push(newNote);
  fs.writeFileSync('notes.json', JSON.stringify(notes, null, 2));
  res.status(201).json(newNote);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
