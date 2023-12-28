import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";

const usersController = new UsersController();
const usersRouter = Router();

// import multer from "multer";
// import uploadConfig from "../config/upload";

// const upload = multer(uploadConfig);

// usersRouter.post("/", usersController.create);
// usersRouter.post("/forgot", usersController.forgot);
// usersRouter.post("/updatpass", usersController.updatepass);
usersRouter.get("/me", ensureAuthenticate, usersController.show);
usersRouter.post("/frequency", ensureAuthenticate, usersController.confirmFrequency);
// usersRouter.post("/me/avatar", ensureAuthenticate, upload.single("avatar"), usersController.update);

export default usersRouter;
