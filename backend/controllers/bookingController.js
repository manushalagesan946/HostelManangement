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
const approveBooking = asyncHandler(async (req, res) => {

    const { requestId } = req.params;

    await bookingService.approveBooking(Number(requestId));

    res.status(200).json(
        new ApiResponse(
            true,
            "Booking approved successfully",
            null
        )
    );

});
const getMyBookings = asyncHandler(async (req, res) => {

    const bookings = await bookingService.getMyBookings(
        req.user.studentId
    );

    res.status(200).json(
        new ApiResponse(
            true,
            "Bookings fetched successfully",
            bookings
        )
    );

});

const rejectBooking = asyncHandler(async (req, res) => {

    const { id } = req.params;

    await bookingService.rejectBooking(id);

    res.status(200).json(
        new ApiResponse(
            true,
            "Booking rejected successfully",
            null
        )
    );

});
const getAllBookings = asyncHandler(async (req, res) => {

    const bookings = await bookingService.getAllBookings();

    res.status(200).json(
        new ApiResponse(
            true,
            "Bookings fetched successfully",
            bookings
        )
    );

});
export default {
    submitBooking,
    getPendingBookings,
    approveBooking,
    getMyBookings,
    rejectBooking,
    getAllBookings
};