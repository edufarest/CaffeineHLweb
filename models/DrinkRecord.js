var mongoose = require('mongoose');

let DrinkRecordSchema = new mongoose.Schema({
    date: {type: Date, default: Date.now}, // Timestamp
    drink: {type: mongoose.Schema.Types.ObjectId, ref: 'Drink'}
});

let DrinkRecord = mongoose.model('DrinkRecord', DrinkRecordSchema);

const create = (drink, date) => {

    let drinkRecord = new DrinkRecord({date: date, drink: drink});

    return drinkRecord.save();

};

const getRecords = (from = Date.now()-24*60*60*1000, to = Date.now()) => {

    return DrinkRecord.find({
        date: {
            $gt: from,
            $lt: to,
        }
    })
        .populate('drink')
        .exec();

};

module.exports = {
    create,
    getRecords,
};
