import ExcelJS from "exceljs";

import Job from "../models/job.model.js";

export const exportJobsToExcel = async (
    req,
    res
) => {
    try {
        // Fetch jobs
        const jobs = await Job.find().sort({
            matchScore: -1,
        });

        // Create workbook
        const workbook = new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet("Matched Jobs");

        // Columns
        worksheet.columns = [
            {
                header: "Company Name",
                key: "companyName",
                width: 30,
            },

            {
                header: "Role",
                key: "role",
                width: 35,
            },

            {
                header: "Salary",
                key: "salary",
                width: 20,
            },

            {
                header: "Location",
                key: "location",
                width: 25,
            },

            {
                header: "Match Score",
                key: "matchScore",
                width: 15,
            },

            {
                header: "Matched Skills",
                key: "skills",
                width: 40,
            },

            {
                header: "Apply Link",
                key: "applyLink",
                width: 60,
            },

            {
                header: "Source",
                key: "source",
                width: 20,
            },
        ];

        // Add rows
        jobs.forEach((job) => {
            worksheet.addRow({
                companyName: job.companyName,

                role: job.role,

                salary: job.salary,

                location: job.location,

                matchScore: `${job.matchScore}%`,

                skills: job.skills.join(", "),

                applyLink: job.applyLink,

                source: job.source,
            });
        });

        // Header styling
        worksheet.getRow(1).font = {
            bold: true,
        };

        // Response headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            'attachment; filename="matched_jobs.xlsx"'
        );

        // Send workbook
        await workbook.xlsx.write(res);

        res.end();
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};