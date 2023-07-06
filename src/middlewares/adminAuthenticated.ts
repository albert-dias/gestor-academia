import { Request, Response, NextFunction } from "express";

export default async function adminAuthenticate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id, type } = req.user;

  if (!id) {
    throw new Error("User is missing");
  }

  try {
    if (type === "ALUNO") {
      throw new Error("User is not Admin");
    }

    return next();
  } catch (err) {
    throw new Error("User is not Admin");
  }
}
