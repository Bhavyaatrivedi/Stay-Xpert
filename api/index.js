const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const User = require('./models/User.js')
const bcrypt = require('bcryptjs')

const bcryptSalt = bcrypt.genSalt(12);

app.use(express.json());

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) =>{
    res.json('test ok')
});

app.post('/register', async (req, res) =>{
    const {name, email, password} = req.body;
    await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    })

    res.json(name, email, password);
})

app.listen(4000);