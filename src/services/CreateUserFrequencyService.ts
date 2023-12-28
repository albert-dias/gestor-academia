import { Frequencys, PrismaClient } from "@prisma/client";

interface IRequest {
  user_id: string;
}

const prisma = new PrismaClient();

export async function CreateUserFrequencyService({ user_id }: IRequest): Promise<Frequencys> {
  const result = await prisma.frequencys.create({
    data:{
      user_id
    }
  });

  return result;
}
