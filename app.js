const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const app = express();
const port = 8000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/test")
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});
const Contact = mongoose.model('contact', contactSchema);

// User Schema for login
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const User = mongoose.model('user', userSchema);

// Middleware
app.use('/static', express.static('static'));
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));

// Session setup
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/test' }),
    cookie: { maxAge: 1000 * 60 * 60 } // 1 hour
}));

// Routes

// Home page
app.get('/', (req, res) => {
  res.status(200).render('home');
});

// Contact page
app.get('/contact', (req, res) => {
  res.status(200).render('contact');
});

// About page
app.get('/about', (req, res) => {
  res.status(200).render('about');
});

// Handle contact form
app.post('/contact', (req, res) => {
  const myData = new Contact(req.body);
  myData.save()
    .then(() => res.send('Contact saved in database'))
    .catch(() => res.status(400).send('Contact not saved in database'));
});

// Login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// Handle login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.render('login', { error: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.render('login', { error: 'Invalid password' });

  req.session.userId = user._id;
  res.send('Login successful!');
});

// Handle registration
app.get('/register', (req, res) => {
  res.render('login', { error: null });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();
    res.send('User registered successfully!');
  } catch (err) {
    res.render('login', { error: 'Username already exists' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
