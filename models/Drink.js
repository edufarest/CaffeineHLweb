var mongoose = require('mongoose');

let drinkSchema = new mongoose.Schema({
    name: {type: String, default: "Drink"},
    servingSize: {type: Number, min: 0}, // ml
    caffeine: {type: Number, min: 0},    // mg
});

let Drink = mongoose.model('Drink', drinkSchema);

const create = (name, servingSize, caffeine) => {

  let drink = new Drink({name: name, servingSize: servingSize, caffeine: caffeine});

  return drink.save();

};


const find = (params) => {

    // TODO Implement params/query

    return Drink.find().exec();

};

const remove = (drink_id) => {

    return Drink.deleteOne({_id: drink_id});

};

const upsert = (name, servingSize, caffeine) => {

    return Drink.findOneAndUpdate({name: name}, {servingSize: servingSize, caffeine: caffeine},
                            {new:true, upsert:true});

};

module.exports = {
    create,
    find,
    remove,
    upsert,
};
