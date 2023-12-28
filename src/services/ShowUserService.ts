import { PrismaClient, Users } from "@prisma/client";

interface IRequest {
  user_id: string;
}

const prisma = new PrismaClient();

export async function ShowUserService({ user_id }: IRequest): Promise<Users> {
  const result = await prisma.users.findUniqueOrThrow({
    where: {
      id: user_id,
    },
    include:{
      historics: true,
      payment: true,
      frequency: true,
      notifications: true,
      people: true
    }
  });

  return result;
}
