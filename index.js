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


app.get('/', (req, res) => {

    res.render('home')
})

app.get('/planets', (req, res) => {
    const { planetName } = req.query
    if (!planetName) {
        res.render('notfound')
    }
    res.render('planets', { planetName })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})