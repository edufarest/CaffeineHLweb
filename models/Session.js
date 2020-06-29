var mongoose = require('mongoose');


// Represents an active user session
let SessionSchema = new mongoose.Schema({
   user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
   expires: {type: Date, default: Date.now() + 7*24*60*60*1000} // Last 1 week
});


// let DrinkRecord = mongoose.model('DrinkRecord', DrinkRecordSchema);

let Session = mongoose.model('Session', SessionSchema);

// var obj = doc.toObject({ virtuals: true });
// var json = doc.toJSON({ virtuals: true });

const create = (userId) => {

   const session = new Session({user: userId});

   return session.save();

};

const deleteSession = (userId) => {

   // TODO See how user is stored in db
   return Session.deleteMany({}).exec();

};

const getSession = (id) => {


   return Session.findById(id).exec();
};

module.exports = {
    create,
    deleteSession,
   getSession
};
