import { execute } from "../config/db.js";

const submitBooking = async (studentId, roomId) => {

    await execute(
        `
        BEGIN
            hostel_package.submit_booking_request(
                :studentId,
                :roomId
            );
        END;
        `,
        {
            studentId,
            roomId
        },
        {
            autoCommit: true
        }
    );

};
const getPendingBookings = async () => {

    const result = await execute(
        `
        SELECT
            br.REQUEST_ID        AS "requestId",
            sd.STUDENT_ID        AS "studentId",
            u.NAME               AS "studentName",
            sd.REGISTER_NO       AS "registerNo",
            sd.DEPARTMENT        AS "department",
            r.ROOM_ID            AS "roomId",
            r.ROOM_NUMBER        AS "roomNumber",
            b.BLOCK_NAME         AS "blockName",
            br.REQUEST_STATUS    AS "requestStatus"
        FROM BOOKING_REQUESTS br

        JOIN STUDENT_DETAILS sd
            ON br.STUDENT_ID = sd.STUDENT_ID

        JOIN USERS u
            ON sd.USER_ID = u.USER_ID

        JOIN ROOMS r
            ON br.ROOM_ID = r.ROOM_ID

        JOIN BLOCKS b
            ON r.BLOCK_ID = b.BLOCK_ID

        WHERE br.REQUEST_STATUS = 'Pending'

        ORDER BY br.REQUEST_ID
        `
    );

    return result.rows;
};
const approveBooking = async (requestId) => {

    const sql = `
    BEGIN
        hostel_package.approve_request(
            :requestId
        );
    END;
    `;

    await execute(
        sql,
        {
            requestId
        },
        {
            autoCommit: true
        }
    );

};
const getMyBookings = async (studentId) => {

    const result = await execute(
        `
        SELECT
            br.REQUEST_ID,
            b.BLOCK_NAME,
            r.ROOM_NUMBER,
            r.FEE,
            br.REQUEST_DATE,
            br.PAYMENT_STATUS,
            br.REQUEST_STATUS
        FROM BOOKING_REQUESTS br
        JOIN ROOMS r
            ON br.ROOM_ID = r.ROOM_ID
        JOIN BLOCKS b
            ON r.BLOCK_ID = b.BLOCK_ID
        WHERE br.STUDENT_ID = :studentId
        ORDER BY br.REQUEST_DATE DESC
        `,
        { studentId }
    );

    return result.rows;
};

const rejectBooking = async (requestId) => {

    await execute(
        `
        BEGIN
            hostel_package.reject_request(
                :requestId
            );
        END;
        `,
        {
            requestId
        },
        {
            autoCommit: true
        }
    );

};

const getAllBookings = async () => {

    const result = await execute(
        `
        SELECT
            br.REQUEST_ID,
            u.NAME,
            s.REGISTER_NO,
            b.BLOCK_NAME,
            r.ROOM_NUMBER,
            r.FEE,
            br.REQUEST_DATE,
            br.PAYMENT_STATUS,
            br.REQUEST_STATUS
        FROM BOOKING_REQUESTS br
        JOIN STUDENT_DETAILS s
            ON br.STUDENT_ID = s.STUDENT_ID
        JOIN USERS u
            ON s.USER_ID = u.USER_ID
        JOIN ROOMS r
            ON br.ROOM_ID = r.ROOM_ID
        JOIN BLOCKS b
            ON r.BLOCK_ID = b.BLOCK_ID
        ORDER BY br.REQUEST_DATE DESC
        `
    );

    return result.rows;

};
export default {
    submitBooking,
    getPendingBookings,
    approveBooking,
    getMyBookings,
    rejectBooking,
    getAllBookings
};