const express = require('express');
const app = express();
const path = require('path')
const dotenv = require('dotenv').config()
const axios = require('axios');

//parsing data in order to populate the body
app.use(express.urlencoded({ extended: true }))
//serving static files
app.use(express.static(path.join(__dirname, '/public')))
//views directory - for ejs files
app.set('views', path.join(__dirname, '/views'))
//enabling ejs
app.set('view engine', 'ejs')

//axios



// routing 
app.get('/', (req, res) => {

    res.render('home')
})

app.get('/planets', (req, res) => {
    const { planetName } = req.query
    const { keyVariable } = //
    const options = {
        method: 'GET',
        url: 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets',
        params: { name: planetName },
        headers: {
            'X-RapidAPI-Key': keyVariable,
            'X-RapidAPI-Host': 'planets-by-api-ninjas.p.rapidapi.com'
        }
    }
    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error('NOTHING FOUND');
    });
    res.render('planets', { planetName })
})

app.listen(8080, () => {
    console.log('listening on port 8080')
})

