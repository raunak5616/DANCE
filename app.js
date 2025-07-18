const express= require('express')
const path = require('path')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/dance', {useNewUrlParser: true, useUnifiedTopology: true})
const app = express()
const port = 80

// mongoose specify stuff
const contact =  new Schema({
  name: String,
  email: String,
  phone: String,
  message: String
});

const Model = mongoose.model('contact', contact);

// express specify stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// pug specify stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

app.get('/', (req, res) => {
  res.status(200).render('home');
});
app.get('/contact',(req, res)=>{
  res.status(200).render('contact');
})
// start port listen
app.listen(port, ()=>{
    console.log(`this is listenitng port ${port}`)
})