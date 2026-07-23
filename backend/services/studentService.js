import { execute } from "../config/db.js";

const getProfile = async (studentId) => {

    const result = await execute(
        `
        SELECT
            u.USER_ID,
            u.NAME,
            u.EMAIL,
            s.STUDENT_ID,
            s.REGISTER_NO,
            s.DEPARTMENT,
            s.YEAR,
            s.GENDER,
            s.PHONE,
            s.PARENT_NAME,
            s.PARENT_PHONE,
            s.ADDRESS
        FROM USERS u
        JOIN STUDENT_DETAILS s
            ON u.USER_ID = s.USER_ID
        WHERE s.STUDENT_ID = :studentId
        `,
        { studentId }
    );

    return result.rows[0];
};

const getAllStudents = async () => {

    const result = await execute(
        `
        SELECT
            s.STUDENT_ID,
            u.NAME,
            u.EMAIL,
            s.REGISTER_NO,
            s.DEPARTMENT,
            s.YEAR,
            s.GENDER,
            s.PHONE,
            s.PARENT_NAME,
            s.PARENT_PHONE,
            s.ADDRESS
        FROM STUDENT_DETAILS s
        JOIN USERS u
            ON s.USER_ID = u.USER_ID
        ORDER BY s.STUDENT_ID
        `
    );

    return result.rows;
};
export default {
    getProfile,
    getAllStudents
};