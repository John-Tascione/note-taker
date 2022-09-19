const express = require('express');
// const { fstat } = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notes = './db/db.json'
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');
const { appendFileSync } = require('fs');


const PORT = process.env.PORT || 3001;

const app = express();



// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static('public'));

// Wildcard route to direct users to a 404 page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, './public/index.html'))
);
// GET Route for homepage
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, './public/notes.html'))
);

// Route to render all notes
app.get('/api/notes', (req, res) => {
    readFromFile(notes).then((data) => res.json(JSON.parse(data)));
})

// Route to create a new note
app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const{ title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };

    readAndAppend(newNote,notes);
    res.json('Note added successfully');
  } else {
    res.errored('Error adding note.')
  }
});

// Route to open an existing note
app.get(notes, (req,res) => {
  const noteId = req.params.id;
  readFromFile(notes)
  .then((data) => JSON.parse(data))
  .then((json) => {
    const result = json.filter((note) => note.id === noteId);
    return result.length > 0 ? res.json(result) : res.json('No note found')
  });
});

// Route to delete a note
app.delete("/api/notes/:id", (req, res) => {
  const noteId = req.params.id;
  console.log(`note id variable: ${noteId}`)
  readFromFile(notes)
  .then((data)=>JSON.parse(data))
  .then((json)=> {
    const result = json.filter((note) => note.id !== noteId);
    console.log(result)
    writeToFile(notes, result);
    res.json(`Note ${noteId} has been deleted`)
  })
})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


