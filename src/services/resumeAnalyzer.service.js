import openai from "./openai.service.js";

export const analyzeResumeWithAI = async (
    extractedText
) => {
    try {
        const prompt = `
You are an AI Resume Analyzer.

Extract the following information from the resume:

1. Skills
2. Projects
3. Technologies
4. Experience Level
5. Preferred Job Roles

Return ONLY valid JSON.

Example:

{
  "skills": [],
  "projects": [],
  "technologies": [],
  "experience": "",
  "preferredRoles": []
}

Resume Text:
${extractedText}
`;

        const response =
            await openai.chat.completions.create({
                model: "gpt-5.4-mini",

                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],

                temperature: 0.2,
            });

        const result =
            response.choices[0].message.content;

        return JSON.parse(result);
    } catch (error) {
        console.log(error);

        throw new Error("AI Resume Analysis Failed");
    }
};