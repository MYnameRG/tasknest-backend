import DatabaseConnection from './config/dbconnection';

class DatabaseServer {
    private _connection: DatabaseConnection;

    constructor() {
        this._connection = new DatabaseConnection();
    }

    connect = async () => {
        await this._connection.connect();
    }

    client = () => {
        return this._connection.getClient();
    }

}

export default new DatabaseServer();