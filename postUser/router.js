import Router from "express";
import PostController from "./PostController.js";
import User from "./user.js";

const router = new Router();

router.post("/users", PostController.create);
router.get("/users", PostController.getAll);
router.get("/users/:id", PostController.getOne);
router.put("/users", PostController.updatePost);
router.delete("/users/:id", PostController.postDelete);

export default router;
