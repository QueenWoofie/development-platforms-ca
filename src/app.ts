import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/auth.js";
import articleRoutes from "./routes/articles.js";
import type { ErrorRequestHandler } from "express";

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/health", (_req, res) => {
    res.json({ ok: true, now: new Date().toISOString() });
});

app.use("/auth", authRoutes);
app.use("/articles", articleRoutes);

// 404 after routes
app.use((req, res) => {
    res.status(404).json({ error: "Route not found", message: `Cannot ${req.method} ${req.originalUrl}` });
});

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
};
app.use(errorHandler);

export default app;