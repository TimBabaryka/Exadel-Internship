import Router from "express";
import PostController from "./PostController.js";
import Post from "./post.js";

const router = new Router();

router.post("/posts", PostController.create);
router.get("/posts", PostController.getAll);
router.get("/posts/:id", PostController.getOne);
router.put("/posts", PostController.updatePost);
router.delete("/posts/:id", PostController.postDelete);

export default router;
