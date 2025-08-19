import CONFIG from "../../config/env";

export default (async () => {
    const GoogleGenAIModule = await import("@google/genai");
    return new GoogleGenAIModule.GoogleGenAI({
        apiKey: CONFIG.GOOGLEAI_API_KEY
    });
})();