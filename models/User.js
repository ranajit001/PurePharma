const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    firstName:{ type: String },
    lastName:{ type: String},
    mobile:{ type: Number},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'doctor', 'admin'], default: 'user' }
});


module.exports = mongoose.model('User', UserSchema);
