const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = 'https://www.imdb.com/find?s=tt&ttype=ft&ref_=fn_ft&q=';

function searchMovies(searchTerm) {
    return fetch(`${url}${searchTerm}`)
        .then(res => res.text())
        .then(body => {
            const $ = cheerio.load(body);
            const movies = [];

            $('.findResult').each((i, element) => {
                const $element = $(element);
                const $image = $element.find('.primary_photo a img');
                const $title = $element.find('.result_text a');
                const $id = $title.attr('href').match(/title\/(.*)\//)[1];
                // /title/tt2527338/?ref_=fn_ft_tt_1
                let movie = {
                    title: $title.text(),
                    image: $image.attr('src'),
                    idIMDB: $id
                }
                movies.push(movie);
            })

            return movies;
        })
}

module.exports = {
    searchMovies
}
