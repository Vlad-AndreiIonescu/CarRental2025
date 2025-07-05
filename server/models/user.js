import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: { type: String, trim: true },
    email: { type: String, unique: true, required: true, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    createdAt: { type: Date, default: Date.now },
    storeCredit: { type: Number, default: 0 },
    usedDiscountCodes: {
        type: [String],
        default: []
    }
});
const User = mongoose.model('User', userSchema);

export default User;