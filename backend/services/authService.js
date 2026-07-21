import { execute } from "../config/db.js";
import { getConnection } from "../config/db.js";
import bcrypt from "bcrypt";
const login = async (email, password) => {

    const result = await execute(
        `
        SELECT
            u.USER_ID,
            u.NAME,
            u.EMAIL,
            u.PASSWORD,
            u.ROLE,
            s.STUDENT_ID
        FROM USERS u
        LEFT JOIN STUDENT_DETAILS s
            ON u.USER_ID = s.USER_ID
        WHERE u.EMAIL = :email
        `,
        {
            email
        }
    );

    const user = result.rows[0];

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(
        password,
        user.PASSWORD
    );

    if (!isMatch) {
        throw new Error("Invalid email or password");
    }

    return user;
};
const register = async (student) => {
    const hashedPassword = await bcrypt.hash(student.password, 10);
    const sql = `
    BEGIN
        hostel_package.register_student(
            :name,
            :email,
            :password,
            :registerNo,
            :department,
            :year,
            :gender,
            :phone,
            :parentName,
            :parentPhone,
            :address
        );
    END;
    `;

    await execute(
        sql,
        {
            name: student.name,
            email: student.email,
            password: hashedPassword,
            registerNo: student.registerNo,
            department: student.department,
            year: student.year,
            gender: student.gender,
            phone: student.phone,
            parentName: student.parentName,
            parentPhone: student.parentPhone,
            address: student.address
        },
        {
            autoCommit: true
        }
    );

};
export default {
    login,
    register
};