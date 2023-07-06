import { Companies, PrismaClient, Users } from "@prisma/client";

interface IRequest {
  user_id: string;
}

const prisma = new PrismaClient();

export async function ShowUserService({
  user_id,
}: IRequest): Promise<Companies> {
  const user = await prisma.users.findFirst({ where: { id: user_id } });

  const result = await prisma.companies.findFirstOrThrow({
    where: {
      id: user?.company_id,
    },
    include: {
      users: true,
    },
  });

  return result;
}
