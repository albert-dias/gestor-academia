import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../config/auth";
import { PrismaClient, Users } from "@prisma/client";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: Users;
  token: string;
}

const prisma = new PrismaClient();

export async function AuthenticatedUserService({
  email,
  password,
}: IRequest): Promise<IResponse> {
  if (!email || !password) {
    throw new Error("Incomplete data!");
  }

  const user = await prisma.users.findUnique({
    where: { email },
    include: {
      people: true,
    },
  });

  if (!user) {
    throw new Error("Incorrect email/password combination");
  }

  const passwordMatched = await compare(password, user.password);

  if (!passwordMatched) {
    throw new Error("Incorrect email/password combination");
  }

  const { secret, expiresIn } = authConfig.jwt;

  const token = sign(
    {
      name: user.people.name,
      email: user.email,
      type: user.user_type,
      company_id: user.company_id,
    },
    secret,
    {
      subject: `${user.id}`,
      expiresIn,
    }
  );

  return { user, token };
}
