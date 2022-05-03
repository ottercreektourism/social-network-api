const express = require('express');
const db = require('./config/connection');

// Importing Reactions, Thoughts and Users models.
const { Reactions, Thoughts, Users } = require('./models');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// TODO: Do this for thoughts and users too
// Finding all documents that are instances of the reactions model.
// TODO: is 'all-reactions' ok or should the name come from somewhere?
// TODO: do I need this for the reacions one, since its only a schema?
app.get('/all-reactions', (req, res) => {
    // Using the Reactions model to find all of the collections (tables) that are associated to that document
    Reactions.find({}), (err, result) => {
        if (err) {
            res.status(500).send({ message: "Internal Server Error" });
        }
        res.status(200).json(result);
    }
});

// Finds all thoughts
app.get('/all-thoughts', (req, res) => {
    Thoughts.find({}), (err, result) => {
        if (err) {
            res.status(500).send({ message: "Internal Server Error" });
        }
        res.status(200).json(result);
    }
});

// Creates a new thought
// TODO: Do I need this? Graydon said it was the same as doing a Thought.create, but in his example he used the seeded data one.
app.post('/all-thoughts/:thought', (req, res) => {
    const newThought = new Thought({ thoughtText: req.params.thought });
    newThought.save();
    if (newThought) {
        res.status(201).json(newThought);
    } else {
        console.log('Could not save new thought');
        res.status(500).json({ error: 'Could not save new thought' });
    }
});


// Finds all users
app.get('/all-users', (req, res) => {
    Users.find({}), (err, result) => {
        if (err) {
            res.status(500).send({ message: "Internal Server Error" });
        }
        res.status(200).json(result);
    }
});


// TODO: make sure that I need this too
app.post('/all-users/:user', (req, res) => {
    const newUser = new User({ username: req.params.user });
    newUser.save();
    if (newUser) {
        res.status(201).json(newUser);
    } else {
        console.log('Could not save new user');
        res.status(500).json({ error: 'Could not save new user' });
    }
});


// Similar to sequelize sync-- accessing the database, setting it up, and listening
// db is the connection that is exported in connection.js
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on ${PORT}!`)
    });
});