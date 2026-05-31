import openai from "./openai.service.js";

export const getAIMatchScore = async (
    resumeData,
    jobDescription
) => {
    const prompt = `
Analyze the candidate and job.

Candidate:
${JSON.stringify(resumeData)}

Job Description:
${jobDescription}

Return ONLY JSON:

{
  "matchScore": 0,
  "matchedSkills": [],
  "missingSkills": [],
  "reason": ""
}
`;

    const response =
        await openai.chat.completions.create({
            model: "gpt-4.1-mini",
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.2,
        });

    return JSON.parse(
        response.choices[0].message.content
    );
};