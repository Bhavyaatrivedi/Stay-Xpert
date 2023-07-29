const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const User = require('./models/User.js')
const bcrypt = require('bcryptjs');
const cookieParser = require('cookie-parser')
const imageDownloader = require('image-downloader')

const bcryptSalt = bcrypt.genSaltSync(12);
const jwtSecret = 'twqyucsbaeiqujwdna';

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173'
}));

console.log(process.env.MONGO_URL);
mongoose.connect(process.env.MONGO_URL);

app.get('/test', (req, res) =>{
    res.json('test ok')
});

app.post('/api/register', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {name,email,password} = req.body;
  
    try {
      const userDoc = await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
      });
      res.json(userDoc);
    } catch (e) {
      res.status(422).json(e);
    }
  
  });

  //Login
  app.post('/api/login', async (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {email,password} = req.body;
    const userDoc = await User.findOne({email});
    if (userDoc) {
      const passOk = bcrypt.compareSync(password, userDoc.password);
      if (passOk) {
        jwt.sign({
          email:userDoc.email,
          id:userDoc._id
        }, jwtSecret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json(userDoc);
        });
      } else {
        res.status(422).json('pass not ok');
      }
    } else {
      res.json('not found');
    }
  });

  //Profile
  app.get('/api/profile', (req,res) => {
    mongoose.connect(process.env.MONGO_URL);
    const {token} = req.cookies;
    if (token) {
      jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if (err) throw err;
        const {name,email,_id} = await User.findById(userData.id);
        res.json({name,email,_id});
      });
    } else {
      res.json(null);
    }
  });


  //Logout
  app.post('/api/logout', (req,res) => {
    res.cookie('token', '').json(true);
  });
  
  
  //Upload Pictures
  app.post('/api/upload-by-link', async (req,res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
      url: link,
      dest: '/tmp/' +newName,
    });
    const url = await uploadToS3('/tmp/' +newName, newName, mime.lookup('/tmp/' +newName));
    res.json(url);
  });




app.listen(4000);