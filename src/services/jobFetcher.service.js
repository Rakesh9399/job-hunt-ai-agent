import axios from "axios";

export const fetchRemoteJobs = async () => {
    try {
        const response = await axios.get(
            "https://remotive.com/api/remote-jobs"
        );

        return response.data.jobs;
    } catch (error) {
        console.log(error);

        throw new Error("Failed to fetch jobs");
    }
};