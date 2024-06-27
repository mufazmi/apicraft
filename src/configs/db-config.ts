import mongoose from 'mongoose';

const dbConnection = (): void => {
    const dbUrl: string = process.env.MONGODB_URI || 'mongodb://localhost:27018/mydatabase';

    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
        .then(() => console.log('Database Connection Success'))
        .catch((err: Error) => console.log(`Connection With Database Failed. Reason ${err.message}`));
};

export default dbConnection();
