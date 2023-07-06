import { PrismaClient, Users } from "@prisma/client";
import { hash } from "bcryptjs";

interface IRequest {
  email: string;
  password: string;
  name: string;
  last_name: string;
  phone: string;
  phone_resp: string;
  fullname_resp: string;
  birthday: string;
  user_id: string;
  last_payment: string;
  due_date: string;
  range: string;
  chevron: number;
  company_id: string;
}

const prisma = new PrismaClient();

export async function CreateUserService({
  email,
  name,
  last_name,
  phone,
  password,
  birthday,
  phone_resp,
  fullname_resp,
  user_id,
  last_payment,
  range,
  chevron,
  company_id,
  due_date,
}: IRequest): Promise<Users> {
  if (
    !email ||
    !name ||
    !last_name ||
    !phone ||
    !password ||
    !birthday ||
    !phone_resp ||
    !fullname_resp ||
    !company_id ||
    !due_date
  ) {
    throw new Error("Incomplete data");
  }

  const userExists = await prisma.users.findFirst({ where: { id: user_id } });

  if (userExists?.user_type === "ALUNO") {
    throw new Error("User don't have permission");
  }

  const rangeTrat = range.toUpperCase();

  const tratEmail = email.toLowerCase().trim();

  const hashPass = await hash("123456", 8);

  const birthTrat = birthday.split("-");
  const birth = new Date(
    Number(birthTrat[0]),
    Number(birthTrat[1]) - 1,
    Number(birthTrat[2])
  );

  const lPTrat = last_payment.split("-");
  const lastPayment = last_payment
    ? new Date(Number(lPTrat[0]), Number(lPTrat[1]) - 1, Number(lPTrat[2]))
    : null;

  const result = await prisma.users.create({
    data: {
      email: tratEmail,
      password: hashPass,
      company: {
        connect: { id: company_id },
      },
      people: {
        create: {
          name,
          last_name,
          birthday: birth,
          phone,
          phone_resp,
          fullname_resp,
          last_payment: lastPayment,
          due_date: Number(due_date),
        },
      },
      historics: {
        create: {
          range: rangeTrat,
          chevron,
        },
      },
    },
  });

  return result;
}
