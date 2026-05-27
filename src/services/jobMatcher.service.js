export const calculateMatchScore = (
    resumeSkills,
    jobDescription
) => {
    let score = 0;

    const matchedSkills = [];

    resumeSkills.forEach((skill) => {
        if (
            jobDescription
                .toLowerCase()
                .includes(skill.toLowerCase())
        ) {
            score += 1;

            matchedSkills.push(skill);
        }
    });

    const finalScore = Math.min(
        Math.round(
            (score / resumeSkills.length) * 100
        ),
        100
    );

    return {
        finalScore,
        matchedSkills,
    };
};