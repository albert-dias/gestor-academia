import { Historics, PrismaClient } from "@prisma/client";

interface IRequest {
  user_id: string;
  student_id: string;
  range: string;
  chevron: number;
}

const prisma = new PrismaClient();

export async function CreateHistoricService({
  student_id,
  range,
  chevron,
  user_id,
}: IRequest): Promise<Historics> {
  if (!student_id || !range || !chevron || !user_id) {
    throw new Error("Incomplete data");
  }

  const userExists = await prisma.users.findFirst({ where: { id: user_id } });

  if (userExists?.user_type === "ALUNO") {
    throw new Error("User don't have permission");
  }

  const rangeTrat = range.toUpperCase();

  const result = await prisma.historics.create({
    data: {
      user_id: student_id,
      range: rangeTrat,
      chevron: chevron,
    },
  });

  return result;
}
