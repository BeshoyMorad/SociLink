import express from "express";
import { getFeedPosts, getUserPosts, likePost } from "../controllers/posts.js";
import { verifyToken } from "../middlewares/auth.js";

const postRouter = express.Router();

postRouter.get("/", verifyToken, getFeedPosts);
postRouter.get("/:userId", verifyToken, getUserPosts);

postRouter.patch("/:postId/like", verifyToken, likePost);

export default postRouter;
