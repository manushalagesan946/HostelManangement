import { execute } from "../config/db.js";

const makePayment = async (studentId, requestId) => {

    // Verify booking belongs to logged-in student
    const booking = await execute(
        `
        SELECT REQUEST_ID
        FROM BOOKING_REQUESTS
        WHERE REQUEST_ID = :requestId
          AND STUDENT_ID = :studentId
        `,
        {
            requestId,
            studentId
        }
    );

    if (booking.rows.length === 0) {
        throw new Error("Unauthorized payment request.");
    }

    await execute(
        `
        BEGIN
            hostel_package.make_payment(
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

const getAllPayments = async () => {

    const result = await execute(
        `
        SELECT
            p.PAYMENT_ID,
            u.NAME,
            s.REGISTER_NO,
            b.BLOCK_NAME,
            r.ROOM_NUMBER,
            p.AMOUNT,
            p.PAYMENT_DATE,
            p.RECEIPT_NUMBER
        FROM PAYMENTS p
        JOIN BOOKING_REQUESTS br
            ON p.REQUEST_ID = br.REQUEST_ID
        JOIN STUDENT_DETAILS s
            ON br.STUDENT_ID = s.STUDENT_ID
        JOIN USERS u
            ON s.USER_ID = u.USER_ID
        JOIN ROOMS r
            ON br.ROOM_ID = r.ROOM_ID
        JOIN BLOCKS b
            ON r.BLOCK_ID = b.BLOCK_ID
        ORDER BY p.PAYMENT_DATE DESC
        `
    );

    return result.rows;
};

export default {
    makePayment,
    getAllPayments
};
