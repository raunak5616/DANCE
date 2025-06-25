const express= require('express')
const path = require('path')
const app = express()
const port = 80



// express specify stuff
app.use('/static', express.static('static'))
app.use(express.urlencoded())

// pug specify stuff
app.set('view engine', 'pug')
app.set('views', path.join(__dirname,'views'))

app.get('/', (req, res) => {
  res.status(200).render('index',{'title': 'hey'});
});
// start port listen
app.listen(port, ()=>{
    console.log(`this is listenitng port ${port}`)
})