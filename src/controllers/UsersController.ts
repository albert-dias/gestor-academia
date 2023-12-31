import { Request, Response } from "express";
import { CreateUserService } from "../services/CreateUserService";
import { ShowUserService } from "../services/ShowUserService";
import { CreateUserFrequencyService } from "../services/CreateUserFrequencyService";

// interface IFile extends Express.Multer.File {
//   key: string;
//   location: string;
// }

export class UsersController {
  async confirmFrequency(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const frequency = await CreateUserFrequencyService({ user_id: id });

      return res.status(201).json(frequency);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  async show(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.user;

      const user = await ShowUserService({ user_id: id });

      return res.status(200).json(user);
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
