import { callLLMResponseModel, generateTaskPrompt } from "../../../../helpers/llm-ai.helper";
import CONFIG from "../../../../config/env";

class LLMService {

    // Ask For LLM Response
    static async askLLMResponse(promptType: string, data: any): Promise<any> {
        try {
            const prompt = generateTaskPrompt(promptType)({ ...data });
            const serviceType = CONFIG.LLM_SERVICE_TYPE as keyof Object;
            const responseModel = callLLMResponseModel(prompt);
            return await (responseModel[serviceType] as any)();
        } catch (e) {
            console.error("Failed to parse AI response: ", e);
            throw e;
        }
    }
}

export const {
    askLLMResponse
} = LLMService;