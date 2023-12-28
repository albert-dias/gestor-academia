import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ShowUserService } from "../services/ShowUserService";
import { CreateHistoricService } from "../services/CreateHistoricService";
import { ListUsersService } from "../services/ListUsersService";
import { CreateUserFrequencyService } from "../services/CreateUserFrequencyService";

// interface IFile extends Express.Multer.File {
//   key: string;
//   location: string;
// }

export class AdminController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id, company_id } = req.user;
      const {
        email,
        name,
        last_name,
        phone,
        birthday,
        phone_resp,
        fullname_resp,
        last_payment,
        range,
        chevron,
        due_date,
      } = req.body;

      const user = await CreateUserService({
        email,
        name,
        last_name,
        phone,
        birthday,
        phone_resp,
        fullname_resp,
        user_id: id,
        last_payment,
        range,
        chevron,
        company_id,
        due_date,
      });

      return res.status(201).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async graduation(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;
      const { student_id, range, chevron } = req.body;
      const result = await CreateHistoricService({
        student_id,
        range,
        chevron,
        user_id: id,
      });
      return res.status(201).json({ message: "success" });
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async list(req: Request, res: Response): Promise<Response> {
    try {
      const { company_id } = req.user;

      const user = await ListUsersService({ company_id });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async showUser(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.params;

      const user = await ShowUserService({ user_id });

      return res.status(200).json(user);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async confirmUserFrequency(req: Request, res: Response): Promise<Response> {
    try {
      const { user_id } = req.body;

      const frequency = await CreateUserFrequencyService({ user_id });

      return res.status(201).json(frequency);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // async update(req: Request, res: Response): Promise<Response> {

  //   try {
  //     const { id } = req.user;
  //     const file = req.file as IFile;

  //     const user = await ShowUserService({ user_id: id });

  //     return res.status(200).json(user);
  //   } catch (error: any) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }

  // async updatepass(req: Request, res: Response): Promise<Response> {

  //   try {

  //     return res.status(200).json(user);
  //   } catch (error) {
  //     return res.status(400).json({ message: error.message });
  //   }
  // }
}
