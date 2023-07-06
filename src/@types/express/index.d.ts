declare namespace Express {
  export interface Request {
    user: {
      id: string;
      name: string;
      email: string;
      type: "ALUNO" | "USERSYSTEM" | "ADMSYSTEM";
      company_id: string;
    };
  }
}
