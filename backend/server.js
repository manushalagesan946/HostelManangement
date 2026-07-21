import dotenv from "dotenv";
import app from "./app.js";
import { initialize } from "./config/db.js";

dotenv.config();

async function startServer() {
    try {
        await initialize();

        app.listen(process.env.PORT, () => {
            console.log(`🚀 Server running on port ${process.env.PORT}`);
        });

    } catch (err) {
        console.error("Unable to start server");
        console.error(err);
    }
}

startServer();