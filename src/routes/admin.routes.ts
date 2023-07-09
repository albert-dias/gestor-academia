import { Router } from "express";
import { AdminController } from "../controllers/AdminController";

const adminController = new AdminController();
const adminRouter = Router();

// import multer from "multer";
// import uploadConfig from "../config/upload";

// const upload = multer(uploadConfig);

// adminRouter.post("/", adminController.create);
// adminRouter.post("/forgot", adminController.forgot);
adminRouter.get("/student", adminController.list);
adminRouter.post("/student", adminController.create);
adminRouter.post("/student/update-graduation", adminController.graduation);

// adminRouter.post("/me/avatar", ensureAuthenticate, upload.single("avatar"), adminController.update);

export default adminRouter;
