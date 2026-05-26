import openai from "./openai.service.js";

export const generateHREmail = async (
    user,
    resumeData,
    job
) => {
    try {
        const prompt = `
You are an expert HR communication assistant.

Generate a professional cold job application email.

Candidate Name:
${user.fullName}

Candidate Email:
${user.email}

Portfolio:
${user.portfolio}

LinkedIn:
${user.linkedin}

GitHub:
${user.github}

Candidate Skills:
${resumeData.skills.join(", ")}

Projects:
${resumeData.projects.join(", ")}

Preferred Roles:
${resumeData.preferredRoles.join(", ")}

Job Role:
${job.role}

Company:
${job.companyName}

Job Description:
${job.description}

IMPORTANT RULES:
- Keep email concise
- No fake claims
- Use candidate real details
- Add proper email ending
- Do not use placeholders
- Mention relevant projects
- Professional tone
- Return ONLY valid JSON

Format:

{
  "subject": "",
  "body": ""
}
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

                temperature: 0.7,
            });

        const result =
            response.choices[0].message.content;

        return JSON.parse(result);
    } catch (error) {
        console.log(error);

        throw new Error(
            "Failed to generate HR email"
        );
    }
};