import OpenAI from 'openai';
import CONFIG from "../../config/env";

export default new OpenAI({
    apiKey: CONFIG.OPENAI_API_KEY
});

