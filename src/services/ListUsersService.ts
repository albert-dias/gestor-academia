import { Companies, PrismaClient, Users } from "@prisma/client";

interface IRequest {
  company_id: string;
}

const prisma = new PrismaClient();

export async function ListUsersService({
  company_id,
}: IRequest): Promise<Users[]> {
  // const user = await prisma.users.findFirst({ where: { id: user_id } });

  const result = await prisma.users.findMany({
    where: {
      company_id,
      user_type: "ALUNO",
    },
    include: {
      people: true,
      historics: true,
    },
    orderBy: {
      people: {
        name: "asc",
      },
    },
  });

  return result;
}
