import express from "express";
import authRouter from "./auth.js";
import userRouter from "./users.js";
import postRouter from "./posts.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
