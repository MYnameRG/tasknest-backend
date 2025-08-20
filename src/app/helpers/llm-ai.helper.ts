import { TaskPrompts } from "../modules/ai/llm/prompts/task.prompt";
import googleAIClient from "../integration/googleAI";
import openAIClient from "../integration/openAI";
import CONFIG from "../config/env";

class LLMAIHelper {

    // Generate Task Prompt
    static generateTaskPrompt(promptType: string) {
        return (TaskPrompts as any)[promptType];
    }

    // Call LLM Response Model
    static callLLMResponseModel(prompt: string) {
        return {
            'GOOGLEAI': async () => {
                return (
                    await
                        (await googleAIClient).models.generateContent({
                            model: CONFIG.LLM_MODEL_TYPE as string,
                            contents: prompt,
                        })
                )
            },
            'OPENAI': async () => {
                return await openAIClient.responses.create({
                    model: CONFIG.LLM_MODEL_TYPE as string,
                    input: prompt
                })
            }
        };
    }
}

export const {
    generateTaskPrompt,
    callLLMResponseModel
} = LLMAIHelper;