import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
});

export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(1),
});

export const articleCreateSchema = z.object({
    title: z.string().min(1).max(200).trim(),
    body: z.string().min(1).trim(),
    category: z.string().min(1).max(50).trim(),
});

export function validate<T>(schema: z.ZodSchema<T>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
        return res.status(400).json({ error: parsed.error.flatten() });
        }
        (req as any).parsedBody = parsed.data;
        next();
    };
}