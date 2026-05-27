import { openLinkedInJobs } from "../automation/linkedin.js";

export const startLinkedInAutomation =
    async (req, res) => {
        try {
            await openLinkedInJobs();

            res.status(200).json({
                success: true,
                message:
                    "LinkedIn automation started",
            });
        } catch (error) {
            console.log(error);

            res.status(500).json({
                success: false,
                message: error.message,
            });
        }
    };