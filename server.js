const express = require('express');
// const { fstat } = require('fs');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const notes = './db/db.json'
const { readFromFile, writeToFile, readAndAppend } = require('./helpers/fsUtils');


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
app.get('/api/notes', (req, res) => {
    readFromFile(notes).then((data) => res.json(JSON.parse(data)));
})

app.post('/api/notes', (req, res) => {
  console.log(req.body);

  const{ title, text} = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      note_id: uuidv4(),
    };

    readAndAppend(newNote,notes);
    res.json('Note added successfully');
  } else {
    res.errored('Error adding note.')
  }
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);


