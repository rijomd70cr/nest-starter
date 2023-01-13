import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String, select: false, },
    address: { addr1: String, city: String, state: String, country: String, zip: Number, },
    created: { type: Date, default: Date.now },
    // refOther: {type: mongoose.Schema.Types.ObjectId,ref: 'User'},   
});
