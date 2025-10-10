import type { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../lib/jwt.js";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const header = req.headers.authorization;
    if (!header?.startsWith("Bearer ")) return res.status(401).json({ error: "Missing token" });
    try {
        (req as any).user = verifyJwt(header.slice(7));
        next();
    } catch {
        return res.status(401).json({ error: "Invalid token" });
    }
}