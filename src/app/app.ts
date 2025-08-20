import type { Express } from "express";
import express from 'express';
import CONFIG from "./config/env";
import dbServer from "./database";
import * as cors from "cors";
import openAIClient from "./integration/openAI";
import googleAIClient from "./integration/googleAI";

class AppServer {
    private app: Express;

    constructor() {
        this.app = express();
    }

    private connectToDB = async () => {
        await dbServer.connect();
    }

    private addMiddlewareBeforeRoute() {
        this.app.use(cors.default())
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
    }

    private addMiddlewareAfterRoute() {

    }

    private testRoutes() {
        this.app.get("/", (_, res) => {
            return res.status(200).send({ data: "API is working now...", isSuccess: true, message: "Received Successfully" });
        });

        this.app.get("/open-ai/test", async (_, res) => {
            const response = await openAIClient.responses.create({
                model: "gpt-4o-mini",
                instructions: 'You are a guider of OpenAI API, treat me like noob player!',
                input: "Hi, this is my first prompt.",
                store: true,
            });

            return res.status(200).json({ data: response.text, isSuccess: true, message: "Received Successfully" });
        });

        this.app.get("/google-ai/test", async (_, res) => {
            const response = await (await googleAIClient).models.generateContent({
                model: "gemini-2.5-flash",
                contents: `
                    Task Title: Buy Phone
                    Task Description: Need IPhone from Amazon
                    Categories: ${["NONE", "GENERAL", "MEETING", "PERSONAL", "WORK", "STUDY"].join(", ")}
                    Choose the best category (only one from list).
                `
            });

            return res.status(200).json({ data: response.text, isSuccess: true, message: "Received Successfully" });
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