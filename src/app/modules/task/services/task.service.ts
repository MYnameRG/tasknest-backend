import { Tags } from "../../../shared/enums/task.enum";
import { extractJsonFromGeminiResponse } from "../../../utils/transformLLMResponse";
import { askLLMResponse } from "../../ai/llm/services/llm.service";
import { ITask } from "../interfaces/task.interface";

class TaskService {
    static async getCategorizedTasks(tasks: ITask[]) {
        try {
            const categories = Object.values(Tags);
            const modelResponse = await askLLMResponse('categorizeTasks', { tasks, categories });
            return extractJsonFromGeminiResponse(modelResponse);
        } catch (e) {
            console.log(e);
            throw e;
        }
    }

    static async savedTasksWithCategory(tasks: ITask[]) {

    }
}

export const {
    getCategorizedTasks
} = TaskService;