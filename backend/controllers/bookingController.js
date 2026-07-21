import bookingService from "../services/bookingService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const submitBooking = asyncHandler(async (req, res) => {

    const { roomId } = req.body;

    const studentId = req.user.studentId;
    if (!req.user.studentId) {
    return res.status(403).json(
        new ApiResponse(
            false,
            "Only students can submit booking requests."
        )
    );
    }
    await bookingService.submitBooking(studentId, roomId);
    
    res.status(201).json(
        new ApiResponse(
            true,
            "Booking request submitted successfully."
        )
    );

});
const getPendingBookings = asyncHandler(async (req, res) => {

    const bookings = await bookingService.getPendingBookings();

    res.status(200).json(
        new ApiResponse(
            true,
            "Pending bookings fetched successfully",
            bookings
        )
    );

});
export default {
    submitBooking,
    getPendingBookings
};