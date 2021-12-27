const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes');

// Customize yargs
yargs.version('1.1.0');

// add, remove, read, list (Notes)

// add command
yargs.command({
  command: 'add',
  description: 'Add a new note',
  builder: {
    title: {
      description: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      description: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

// remove command
yargs.command({
  command: 'remove',
  description: 'Remove a note',
  builder: {
    title: {
      description: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

// list command
yargs.command({
  command: 'list',
  description: 'List the notes',
  handler() {
    notes.listNotes();
  },
});

// read command
yargs.command({
  command: 'read',
  description: 'Read a note',
  builder: {
    title: {
      description: 'Note title',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

yargs.parse();
