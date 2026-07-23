import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import dashboardService from "../services/dashboardService.js";

const getDashboard = asyncHandler(async (req, res) => {

    const dashboard = await dashboardService.getDashboard();

    res.status(200).json(
        new ApiResponse(
            true,
            "Dashboard fetched successfully",
            dashboard
        )
    );

});

export default {
    getDashboard
};