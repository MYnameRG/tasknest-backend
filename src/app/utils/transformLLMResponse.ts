export const extractJsonFromGeminiResponse = (response: any) => {
    try {
        const rawText = response?.text || "";
        
        // Remove ```json ... ``` wrappers
        const cleaned = rawText
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();

        // Parse JSON safely
        return JSON.parse(cleaned);
    } catch (e) {
        console.error("Failed to extract JSON from Gemini response", e);
        return null;
    }
}