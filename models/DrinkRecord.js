var mongoose = require('mongoose');

let DrinkRecordSchema = new mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    date: {type: Date, default: Date.now}, // Timestamp
    drink: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink'}
});

let DrinkRecord = mongoose.model('DrinkRecord', DrinkRecordSchema);

const create = (user, drink, date) => {

    let drinkRecord = new DrinkRecord({user: user, date: date, drink: drink});

    return drinkRecord.save();

};

const dayInMs = 24*60*60*1000;
const getRecords = (user, from = Date.now() - dayInMs, to = Date.now()) => {

    return DrinkRecord.find({
        user: user,
        date: {
            $gt: from,
            $lt: to,
        }
    })
        .populate('drink')
        .exec();

};

const deleteRecord = id => {

    return DrinkRecord.deleteOne({_id: id});

};

module.exports = {
    create,
    getRecords,
    deleteRecord,
};
