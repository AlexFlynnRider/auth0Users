const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: {
        type: String,
        default: () => new mongoose.Types.ObjectId().toString(), // Gera uma string baseada no ObjectId
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    guia: {
        type: Boolean,
        default: false
    },
    favoriteCards: [{
        type: String,  // Altere para String para compatibilidade com Appwrite
        ref: 'Card'
    }],
    favoriteActivities: [{
        type: String,  // Altere para String para compatibilidade com Appwrite
        ref: 'Activity'
    }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
