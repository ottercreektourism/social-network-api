const express = require('express');
const db = require('./config/connection');


const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(require('./routes'));


// Similar to sequelize sync-- accessing the database, setting it up, and listening
// db is the connection that is exported in connection.js
db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on ${PORT}!`)
    });
});