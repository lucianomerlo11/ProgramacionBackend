import { Router } from "express";
import productRouter from "./products.routes.js";
import cartRouter from "./cart.routes.js";
import sessionRouter from "./session.routes.js";
import userRouter from "./user.routes.js";

const router = Router();

router.use("/api/products", productRouter);
router.use("/api/carts", cartRouter);
router.use("/api/session", sessionRouter);
router.use("/api/users", userRouter);

export default router;