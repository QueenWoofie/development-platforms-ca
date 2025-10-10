import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

export interface JwtPayload { sub: number; email: string; }

export const signJwt = (payload: JwtPayload) =>
    jwt.sign(payload, env.JWT_SECRET, { expiresIn: "7d" });

export const verifyJwt = (token: string): JwtPayload =>
    jwt.verify(token, env.JWT_SECRET) as JwtPayload;