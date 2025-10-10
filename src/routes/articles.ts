import { Router } from "express";
import { pool } from "../config/database.js";
import { requireAuth } from "../middleware/requireAuth.js";
import { validate, articleCreateSchema } from "../schemas.js";

const router = Router();

router.get("/", async (_req, res) => {
  const [rows] = await pool.query(
    `SELECT a.id, a.title, a.body, a.category, a.created_at,
            u.email AS submitted_by_email
     FROM articles a
     JOIN users u ON u.id = a.submitted_by
     ORDER BY a.created_at DESC`
  );
  res.json(rows);
});

router.post("/", requireAuth, validate(articleCreateSchema), async (req: any, res) => {
    const { title, body, category } = req.parsedBody ?? req.body;
    const userId = req.user.sub as number;

    const [result] = await pool.query(
        "INSERT INTO articles (title, body, category, submitted_by, created_at) VALUES (?, ?, ?, ?, NOW())",
        [title, body, category, userId]
    );
    const id = (result as any).insertId;
    res.status(201).json({ id, title, body, category });
});

export default router;