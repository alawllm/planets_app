const express = require('express');
const app = express();
const path = require('path')
const axios = require('axios');
const key = require('./.env');
const catchAsync = require('./utils/catchAsync');
const { error } = require('console');


//parsing data in order to populate the body
app.use(express.urlencoded({ extended: true }))
//serving static files
app.use(express.static(path.join(__dirname, 'public')))
//views directory - for ejs files
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
// routing 
app.get('/', (req, res) => {

    res.render('home')
})

//main planet searching route
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

// random route 'i'm feeling lucky'
// app.get('/randomplanet', catchAsync(async (req, res) => {
//     // const {planetName} = ??
//     const options = {
//         method: 'GET',
//         url: 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets',
//         params: { name: planetName },
//         headers: {
//             'X-RapidAPI-Key': key,
//             'X-RapidAPI-Host': 'planets-by-api-ninjas.p.rapidapi.com'
//         }
//     }
//     let src = await axios.request(options).then(function (response) {
//         return response.data[0]
//     })
//     if (error) {
//         res.render('notfound')
//     }

//     res.render('planets', { planetName, src })
// }))

app.all('*', (req, res, next) => {
    res.render('notfound')
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})

