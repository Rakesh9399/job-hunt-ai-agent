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
    },
    {
        timestamps: true,
    }
);

const Job = mongoose.model("Job", jobSchema);

export default Job;