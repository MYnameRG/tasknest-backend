import client from "../../../../integration/googleAI";

export class LLMService {
    static async askLLMResponse(prompt: string): Promise<any> {
        try {
            const response = await (await client).models.generateContent({
                model: "gemini-1.5-flash",
                contents: prompt,
            });

            return response;
        } catch (e) {
            console.error("Failed to parse AI response: ", e);
            throw e;
        }
    }
}