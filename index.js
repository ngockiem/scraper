const express = require('express');
const env = require('dotenv');
env.config();

const scraper = require('./scraper');

const port = process.env.PORT || 3000;
const app = express();

app.get("/", (req, res) => {
    res.json({
        message: 'Scraping is fun !'
    })
})

app.get("/search/:title", (req, res) => {
    scraper.searchMovies(req.params.title)
        .then(movies => {
            res.json(movies)
        })
})

app.listen(port, () => {
    console.log(`Server is listen on ${port}`);
})
