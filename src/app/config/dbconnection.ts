import { connect, Connection, Mongoose } from 'mongoose';

export default class DatabaseConnection {
    private MONGO_URI: string;
    private MONGO_CLIENT: Connection | undefined;

    constructor() {
        this.MONGO_URI = process.env.MONGODB_URI as string;
    }

    getClient = () => {
        return this.MONGO_CLIENT;
    }

    connect = async () => {
        try {
            this.MONGO_CLIENT = (await connect(this.MONGO_URI)).connection;
            console.log('The MongoDB server is connected successfully!!');
        } catch (e) {
            console.error('MongoDB connection error:', e);
            process.exit(1);
        }
    }
}