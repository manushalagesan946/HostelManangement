import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import studentService from "../services/studentService.js";

const getProfile = asyncHandler(async (req, res) => {

    const student = await studentService.getProfile(
        req.user.studentId
    );

    res.status(200).json(
        new ApiResponse(
            true,
            "Student profile fetched successfully",
            student
        )
    );

});
const getAllStudents = asyncHandler(async (req, res) => {

    const students = await studentService.getAllStudents();

    res.status(200).json(
        new ApiResponse(
            true,
            "Students fetched successfully",
            students
        )
    );

});
export default {
    getProfile,
    getAllStudents
};