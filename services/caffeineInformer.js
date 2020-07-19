let osmosis = require('osmosis');
let Drink = require('../models/Drink');
let fetch = require('node-fetch');

const siteUrl = "http://www.caffeineinformer.com/the-caffeine-database";

// osmosis
//     .get(siteUrl)
//     .find('script')
//     .set({
//         // name: 'td[0]',
//         // serving: 'td[1]', // Fl oz
//         // caffeine: 'td[2]', // Mg
//         res: '*'
//     })
//     .data(result => {
//         console.log(result);
//     });

// osmosis.get(siteUrl).data(result => console.log(result))

const regex = /(?<=var\ tbldata\ =\ )(.*)(?=;)/;

const scrape = () => {
    fetch(siteUrl).then((res) => {
        res.text().then((html) => {


            let drinksArr = html.match(regex)[1];

            // drinksArr = drinksArr.substring(1, drinksArr.length - 1);

            let drinks = JSON.parse(drinksArr);

            drinks.forEach((drink) => {

                const name = drink[0].match(/(?<='>)(.*)(?=<\/a>)/)[1];
                const servingSize = parseInt(drink[1]) * 29.574; // fl oz -> ml
                const caffeine = parseInt(drink[2]);

                // FIXME Create seed mongodb scripts
                Drink.upsert(name, servingSize, caffeine)
                    .then((drink) => {
                        console.log("Created/Updated " + drink);
                    }).catch((err) => {
                    console.log("Could not create drink " + err);
                });

            });
        });
    });
};

module.exports = {
    scrape,
};
