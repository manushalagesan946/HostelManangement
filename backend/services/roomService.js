import { execute } from "../config/db.js";

const getAllRooms = async () => {

    const result = await execute(`
        SELECT
            room_id,
            room_number,
            block_id,
            capacity,
            occupied_count,
            fee
        FROM ROOMS
        ORDER BY room_id
    `);

    return result.rows;
};

const getRoomById = async (roomId) => {

    const result = await execute(
        `
        SELECT
            room_id,
            room_number,
            block_id,
            capacity,
            occupied_count,
            fee
        FROM ROOMS
        WHERE room_id = :roomId
        `,
        {
            roomId
        }
    );

    return result.rows[0];
};

export default {
    getAllRooms,
    getRoomById
};