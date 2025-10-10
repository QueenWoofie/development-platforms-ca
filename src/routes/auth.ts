import { Router } from "express";
import bcrypt from "bcrypt";
import { pool } from "../config/database.js";
import { validate, registerSchema, loginSchema } from "../schemas.js";
import { signJwt } from "../lib/jwt.js";

const router = Router();

async function handleRegister(req: any, res: any) {
    const { email, password } = req.parsedBody ?? req.body;

    const [rows] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if ((rows as any[])[0]) return res.status(409).json({ error: "Email already in use" });

    const hash = await bcrypt.hash(password, 10);
    const [result] = await pool.query(
        "INSERT INTO users (email, password_hash, created_at) VALUES (?, ?, NOW())",
        [email, hash]
    );
    const id = (result as any).insertId;
    return res.status(201).json({ id, email });
}

async function handleLogin(req: any, res: any) {
    const { email, password } = req.parsedBody ?? req.body;

    const [rows] = await pool.query(
        "SELECT id, email, password_hash FROM users WHERE email = ?",
        [email]
    );
    const user = (rows as any[])[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: "Invalid credentials" });

    const token = signJwt({ sub: user.id, email: user.email });
    return res.json({ token });
}

router.post("/register", validate(registerSchema), (req, res) => void handleRegister(req, res));
router.post("/login", validate(loginSchema), (req, res) => void handleLogin(req, res));

router.post("/user/register", validate(registerSchema), (req, res) => void handleRegister(req, res));
router.post("/user/login", validate(loginSchema), (req, res) => void handleLogin(req, res));

export default router;