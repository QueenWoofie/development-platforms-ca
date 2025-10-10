import { createServer } from "http";
import app from "./app.ts";
import { env } from "./config/env.js";
import { testConnection } from "./config/database.js";

const server = createServer(app);

(async () => {
    await testConnection();
    server.listen(env.PORT, () => {
        console.log(`API listening on http://localhost:${env.PORT}`);
    });
})();