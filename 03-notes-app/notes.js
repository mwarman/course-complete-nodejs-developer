const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (duplicateNote) {
    console.log(chalk.red.inverse('Note title taken.'));
  } else {
    notes.push({
      title,
      body,
    });

    saveNotes(notes);
    console.log(chalk.green.inverse('New note added'));
  }
};

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length === notesToKeep.length) {
    console.log(chalk.red.inverse('No note found!'));
  } else {
    saveNotes(notesToKeep);
    console.log(chalk.green.inverse('Note removed!'));
  }
};

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.blue.inverse('Your notes:'));

  notes.forEach((note) => {
    console.log(chalk.blue(note.title));
  });
};

const readNote = (title) => {
  const notes = loadNotes();

  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(`${chalk.green.inverse(note.title)} ${note.body}`);
  } else {
    console.log(chalk.red.inverse('No note found!'));
  }
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};

module.exports = {
  addNote,
  listNotes,
  readNote,
  removeNote,
};
