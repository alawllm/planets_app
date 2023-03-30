const express = require('express');
const app = express();
const path = require('path')
import axios from 'axios';



app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index')
})


// const options = {
//     method: 'GET',
//     url: 'https://planets-by-api-ninjas.p.rapidapi.com/v1/planets',
//     params: { name: 'Mars' },
//     headers: {
//         'X-RapidAPI-Key': 'SIGN-UP-FOR-KEY',
//         'X-RapidAPI-Host': 'planets-by-api-ninjas.p.rapidapi.com'
//     }
// };
// axios.request(options).then(function (response) {
//     console.log(response.data);
// }).catch(function (error) {
//     console.error(error);
// });

app.listen(8080, () => {
    console.log('listening on port 8080')
})