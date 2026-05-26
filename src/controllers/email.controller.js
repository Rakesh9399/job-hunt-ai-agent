import Resume from "../models/resume.model.js";

import Job from "../models/job.model.js";

import { generateHREmail } from "../services/emailGenerator.service.js";

import User from "../models/user.model.js";

export const generateEmailForJob =
    async (req, res) => {
        try {
            const { jobId } = req.params;

            // Find Job
            const job = await Job.findById(jobId);

            if (!job) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found",
                });
            }

            // Latest Resume
            const latestResume =
                await Resume.findOne().sort({
                    createdAt: -1,
                });

            if (!latestResume) {
                return res.status(404).json({
                    success: false,
                    message: "Resume not found",
                });
            }

            const user = await User.findOne().sort({
                createdAt: -1,
            });

            // Generate AI email
            const email = await generateHREmail(
                user,
                latestResume.aiData,
                job
            );

            // Save in DB
            job.hrEmailDraft = email;

            await job.save();

            res.status(200).json({
                success: true,

                data: {
                    subject: email.subject,
                    body: email.body,
                },
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };