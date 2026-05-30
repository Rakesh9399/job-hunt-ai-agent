import Resume from "../models/resume.model.js";
import Job from "../models/job.model.js";

import { fetchRemoteJobs } from "../services/jobFetcher.service.js";

import { calculateMatchScore } from "../services/jobMatcher.service.js";

export const fetchAndSaveJobs = async (
    req,
    res
) => {
    try {
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

        const jobs = await fetchRemoteJobs();

        const savedJobs = [];

        for (const job of jobs.slice(0, 30)) {
            const { finalScore, matchedSkills } =
                calculateMatchScore(
                    latestResume.aiData.skills,
                    job.description
                );

            const newJob = await Job.create({
                companyName: job.company_name,

                role: job.title,

                salary:
                    job.salary || "Not Mentioned",

                location:
                    job.candidate_required_location,

                applyLink: job.url,

                description: job.description,

                source: "Remotive",

                skills: matchedSkills,

                matchScore: finalScore,
            });

            savedJobs.push(newJob);
        }

        res.status(200).json({
            success: true,
            totalJobs: savedJobs.length,
            data: savedJobs,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAllJobs = async (
    req,
    res
) => {
    try {
        // Query params
        const {
            search,
            minMatch,
            page = 1,
            limit = 10,
            sort = "matchScore",
        } = req.query;

        // Filter object
        const filter = {};

        // Search by role/company
        if (search) {
            filter.$or = [
                {
                    role: {
                        $regex: search,
                        $options: "i",
                    },
                },

                {
                    companyName: {
                        $regex: search,
                        $options: "i",
                    },
                },
            ];
        }

        // Minimum match score
        if (minMatch) {
            filter.matchScore = {
                $gte: Number(minMatch),
            };
        }

        // Pagination
        const skip =
            (Number(page) - 1) * Number(limit);

        // Fetch jobs
        const jobs = await Job.find(filter)
            .sort({
                [sort]: -1,
            })
            .skip(skip)
            .limit(Number(limit));

        // Total count
        const totalJobs =
            await Job.countDocuments(filter);

        res.status(200).json({
            success: true,

            currentPage: Number(page),

            totalPages: Math.ceil(
                totalJobs / Number(limit)
            ),

            totalJobs,

            data: jobs,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getSavedJobs =
    async (req, res) => {
        try {
            const jobs = await Job.find()
                .sort({
                    createdAt: -1,
                });

            res.json({
                success: true,
                total: jobs.length,
                data: jobs,
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };