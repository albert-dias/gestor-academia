import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

import authConfig from "../config/auth";

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
  name: string;
  email: string;
  type: "ALUNO" | "USERSYSTEM" | "ADMSYSTEM";
  company_id: string;
}

export default function ensureAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error("JWT token is missing");
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub, name, email, type, company_id } = decoded as ITokenPayload;

    req.user = {
      id: sub,
      name,
      email,
      type,
      company_id,
    };

    return next();
  } catch (err) {
    throw new Error("Invalid JWT token");
  }
}
