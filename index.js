const express = require('express');
const app = express();
const ejsMate = require('ejs-mate')
const path = require('path')
const axios = require('axios');
const key = require('./.env')

//parsing data in order to populate the body
app.use(express.urlencoded({ extended: true }))
//serving static files
app.use(express.static(path.join(__dirname, '/public')))
//views directory - for ejs files
app.set('views', path.join(__dirname, '/views'))
//enabling ejs-mate: serving partials, include
app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
// routing 
app.get('/', (req, res) => {

    res.render('home')
})

//main planet searching route
app.get('/planets', async (req, res) => {
    const { planetName } = req.query
    const options = {
        method: 'GET',
        url: 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets',
        params: { name: planetName },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'planets-by-api-ninjas.p.rapidapi.com'
        }
    }

    let src = await axios.request(options).then(function (response) {
        return response.data[0]
    })
    if (!planetName) {
        res.render('notfound')
    }

    res.render('planets', { planetName, src })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})

