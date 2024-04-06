const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkuser } = require('./middleware/authMiddleware');



const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set('view engine', 'ejs');

// database connection
const dbURI = 'mongodb+srv://Younes:w37UUKvKUHniWsaN@cluster0.4k2zdr1.mongodb.net/node-auth';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(4000))
  .catch((err) => console.log(err));

// routes
app.get('*', checkuser)
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies',requireAuth, (req, res) => res.render('smoothies'));


//cookies

/*
app.get('/set-cookies',(req,res)=>{

  //res.setHeader('Set-Cookie', 'newUser=true'); the same as the next line
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, {maxAge: 1000 * 60 * 60 * 24, httpOnly: true })
  res.send('you got the cookies! ')
})

app.get('/read-cookies', (req,res)=>{

  const cookies = req.cookies;
  console.log(cookies)
  res.json(cookies);
})
*/

app.get('/')
app.use(authRoutes)