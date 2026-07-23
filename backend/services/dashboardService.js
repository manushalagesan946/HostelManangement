import { execute } from "../config/db.js";

const getDashboard = async () => {

    const result = await execute(
        `
        SELECT
            (SELECT COUNT(*) FROM STUDENT_DETAILS) AS TOTAL_STUDENTS,

            (SELECT COUNT(*) FROM ROOMS) AS TOTAL_ROOMS,

            (SELECT COUNT(*)
               FROM ROOMS
              WHERE OCCUPIED_COUNT < CAPACITY) AS AVAILABLE_ROOMS,

            (SELECT COUNT(*)
               FROM ROOMS
              WHERE OCCUPIED_COUNT = CAPACITY) AS FULL_ROOMS,

            (SELECT COUNT(*)
               FROM BOOKING_REQUESTS
              WHERE REQUEST_STATUS = 'Pending') AS PENDING_REQUESTS,

            (SELECT COUNT(*)
               FROM BOOKING_REQUESTS
              WHERE REQUEST_STATUS = 'Approved') AS APPROVED_REQUESTS,

            (SELECT COUNT(*)
               FROM BOOKING_REQUESTS
              WHERE REQUEST_STATUS = 'Rejected') AS REJECTED_REQUESTS,

            (SELECT NVL(SUM(AMOUNT),0)
               FROM PAYMENTS) AS TOTAL_REVENUE

        FROM DUAL
        `
    );

    return result.rows[0];

};

export default {
    getDashboard
};