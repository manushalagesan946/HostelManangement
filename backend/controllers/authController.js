import jwt from "jsonwebtoken";

import authService from "../services/authService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const login = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await authService.login(email, password);

    if (!user) {
        return res.status(401).json(
            new ApiResponse(
                false,
                "Invalid username or password"
            )
        );
    }
    
    const token = jwt.sign(
    {
        userId: user.USER_ID,
        studentId: user.STUDENT_ID,
        role: user.ROLE
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1d"
    }
    );

    res.status(200).json(
        new ApiResponse(
            true,
            "Login successful",
            {
                token,
                user: {
                    userId: user.USER_ID,
                    studentId: user.STUDENT_ID,
                    name: user.NAME,
                    email: user.EMAIL,
                    role: user.ROLE
                }
            }
        )
    );

});
const register = asyncHandler(async (req, res) => {

    await authService.register(req.body);

    res.status(201).json(
        new ApiResponse(
            true,
            "Student registered successfully",
            null
        )
    );

});
export default {
    login,
    register    
};