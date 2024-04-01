import express from "express";

import {
  RegisterController,
  LoginController,
} from "../../controllers/auth_controller.js";
import { AuthMiddleware } from "../../middlewares/auth_middleware.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);

export default router;
