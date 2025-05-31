import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://ionescuvladd16:z0aFQAtDEIYqka6n@cluster0.teynd.mongodb.net/CarRentalDB");
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
    }
}

export  { connectDB };

