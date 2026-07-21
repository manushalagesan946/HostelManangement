import roomService from "../services/roomService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const getAllRooms = asyncHandler(async (req, res) => {

    const rooms = await roomService.getAllRooms();

    res.status(200).json(
        new ApiResponse(
            true,
            "Rooms fetched successfully",
            rooms
        )
    );
});

const getRoomById = asyncHandler(async (req, res) => {

    const { id } = req.params;

    const room = await roomService.getRoomById(id);

    if (!room) {
        return res.status(404).json(
            new ApiResponse(
                false,
                "Room not found"
            )
        );
    }

    res.status(200).json(
        new ApiResponse(
            true,
            "Room fetched successfully",
            room
        )
    );

});

export default {
    getAllRooms,
    getRoomById
};