import { Router } from "express";
import usersRouter from "./users.routes";
import sessionsRouter from "./sessions.routes";
import ensureAuthenticate from "../middlewares/ensureAuthenticated";
import adminRouter from "./admin.routes";
import adminAuthenticate from "../middlewares/adminAuthenticated";

const routes = Router();

routes.use("/sessions", sessionsRouter);
routes.use("/users", usersRouter);
routes.use("/admin", ensureAuthenticate, adminAuthenticate, adminRouter);

routes.get("/", (req, res) =>
  res.json({ result: "Bem-Vindo ao CT-Jonson Rodrigues" })
);

export default routes;
