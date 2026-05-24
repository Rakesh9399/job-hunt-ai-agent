import User from "../models/user.model.js";

export const createUserProfile = async (
    req,
    res
) => {
    try {
        const user = await User.create(req.body);

        res.status(201).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getUserProfile = async (
    req,
    res
) => {
    try {
        const user = await User.findOne().sort({
            createdAt: -1,
        });

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};