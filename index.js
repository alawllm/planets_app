const express = require('express');
const app = express();
const path = require('path')


//parsing data in order to populate the body
app.use(express.urlencoded({ extended: true }))
//serving static files
app.use(express.static(path.join(__dirname, '/public')))
//views directory - for ejs files
app.set('views', path.join(__dirname, '/views'))
//enabling ejs
app.set('view engine', 'ejs')


const planets = ['pluto', 'saturn', 'earth', 'mars', 'jupiter']


app.get('/', (req, res) => {
    res.render('home', { planets })
})

app.post('/', (req, res) => {
    res.send('post request!!!')
})

app.get('/planets', (req, res) => {
    res.render('planets')
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})