import type { Express } from "express";
import express from 'express';
import CONFIG from "./config/env";
import dbServer from "./database";

class AppServer {
    private app: Express;

    constructor() {
        this.app = express();
    }

    private connectToDB = async () => {
        await dbServer.connect();
    }

    private addMiddlewareBeforeRoute() {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private addMiddlewareAfterRoute() {

    }

    private testRoutes() {
        this.app.get("/", (_, res) => {
            return res.status(200).send("API is working now...");
        });
    }

    private mainRoutes = () => {
        this.app.use("/api/v1", require("./modules/index.route").default);
    }

    start = async () => {
        await this.connectToDB();

        this.addMiddlewareBeforeRoute();
        this.testRoutes();
        this.mainRoutes();
        this.addMiddlewareAfterRoute();

        this.app.listen(CONFIG.PORT, async () => {
            console.log(`The server is listening on port: ${CONFIG.PORT}`);
        });
    }
}

export default new AppServer();