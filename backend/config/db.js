import oracledb from "oracledb";
import dotenv from "dotenv";

dotenv.config();

let pool;

export const initialize = async () => {
    try {
        pool = await oracledb.createPool({
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            connectString: process.env.DB_CONNECT_STRING,

            poolMin: 2,
            poolMax: 10,
            poolIncrement: 1
        });

        console.log("✅ Oracle Connection Pool Created");
    } catch (err) {
        console.error(err);
        throw err;
    }
};
export const getConnection = async () => {
    return await pool.getConnection();
};
export const execute = async (sql, binds = [], options = {}) => {
    let connection;

    try {
        connection = await pool.getConnection();

        const result = await connection.execute(sql, binds, {
            outFormat: oracledb.OUT_FORMAT_OBJECT,
            autoCommit: options.autoCommit ?? false,
            ...options
        });

        return result;
    } finally {
        if (connection) {
            await connection.close();
        }
    }
};