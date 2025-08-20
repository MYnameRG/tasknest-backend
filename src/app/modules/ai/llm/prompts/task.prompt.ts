export const TaskPrompts = {
    categorizeTasks: ({ categories, tasks }: { categories: string[], tasks: any[] }) => `
        You are an intelligent task assistant. 
        
        Categories available: ${categories.join(", ")}.
        Categorize each task into one of the categories.

        Here, the list of tasks:
        ${tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}

        Respond in JSON:
        [
            { "task_id": "task ID (MongoDB ObjectID format)", "category": "chosen category (String)" }
        ]
    `,

    prioritizeTasks: ({ tasks, priorities }: { tasks: string[], priorities: string[] }) => `
        You are a productivity assistant.

        Here, the list of tasks:
        ${tasks.map((t, i) => `${i + 1}. ${t}`).join("\n")}

        Decide its priority: ${priorities.join(",")}.

        Respond in JSON: 
        { "task_id": "task ID (MongoDB ObjectID format)", "priority": "chosen priority (String)" }
    `,
};