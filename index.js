'use strict';
const express = require('express');
const app = express();
const path = require('path')
const axios = require('axios');
const key = require('./.env');
const catchAsync = require('../utils/catchAsync');
const serverless = require('serverless-http');
const bodyParser = require('body-parser');

const router = express.Router();
app.use(bodyParser)
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {

    res.render('home')
})

app.get('/planets', catchAsync(async (req, res) => {
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
    if (!src) {
        res.render('notfound')
    }

    res.render('planets', { planetName, src })
}))

app.get('/randomplanet', catchAsync(async (req, res) => {
    const planetMass = Math.random() * .1
    const planetOffset = Math.floor(Math.random() * 100)
    const options = {
        method: 'GET',
        url: 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets',
        params: { min_mass: planetMass, offset: planetOffset },
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'planets-by-api-ninjas.p.rapidapi.com'
        }
    }
    let src = await axios.request(options).then(function (response) {
        return response.data[0]
    })
    if (!src) {
        res.render('notfound')
    }
    console.log(src)
    res.render('planets', { src })
}))

app.all('*', (req, res, next) => {
    res.render('notfound')
})

app.listen(4000, () => {
    console.log('listening on port 3000')
})

app.use('/.netlify/functions/index', router);

module.exports = app;
module.exports.handler = serverless(app)