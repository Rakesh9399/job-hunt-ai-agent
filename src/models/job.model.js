import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
    {
        companyName: String,

        role: String,

        salary: String,

        location: String,

        applyLink: String,

        description: String,

        source: String,

        skills: [String],

        matchScore: Number,

        hrEmailDraft: {
            subject: String,
            body: String,
        },

        linkedinJobId: String,

        companyName: String,

        role: String,

        location: String,

        applyLink: String,

        easyApply: Boolean,

        source: {
            type: String,
            default: "LinkedIn",
        },

        aiMatchScore: Number,

        matchedSkills: [String],

        missingSkills: [String],

        matchReason: String,
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;