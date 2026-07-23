import paymentService from "../services/paymentService.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";

const makePayment = asyncHandler(async (req, res) => {

    const { requestId } = req.body;

    await paymentService.makePayment(
        req.user.studentId,
        requestId
    );

    res.status(200).json(
        new ApiResponse(
            true,
            "Payment completed successfully",
            null
        )
    );

});
const getAllPayments = asyncHandler(async (req, res) => {

    const payments = await paymentService.getAllPayments();

    res.status(200).json(
        new ApiResponse(
            true,
            "Payments fetched successfully",
            payments
        )
    );

});
export default {
    makePayment,
    getAllPayments
};