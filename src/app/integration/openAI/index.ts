import OpenAI from 'openai';
import CONFIG from "../../config/env";

const client = new OpenAI({
    apiKey: CONFIG.OPENAI_API_KEY
});

export default client;

