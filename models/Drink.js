var mongoose = require('mongoose');

let drinkSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    name: {type: String, default: "Drink"},
    servingSize: {type: Number, min: 0}, // ml
    caffeine: {type: Number, min: 0},    // mg
});

let Drink = mongoose.model('Drink', drinkSchema);

const create = (name, servingSize, caffeine, user = null) => {

  let drink = new Drink({name: name, servingSize: servingSize, caffeine: caffeine, user: user});

  return drink.save();

};


const find = (user = null) => {

    // TODO Implement params/query

    // Get public and private drinks (if any)
    return Drink.find({ $or:[{'user': user}, {'user': null}]}).exec();

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
