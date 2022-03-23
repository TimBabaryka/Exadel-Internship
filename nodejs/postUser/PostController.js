import User from "./user.js";

class PostController {
  async create(req, res) {
    try {
      const { userName, email, password, role } = req.body;
      const post = await User.create({ userName, email, password, role });
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await User.find();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOneById(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: ` ID does not exist` });
      }
      const post = await User.findById(id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async updatePost(req, res) {
    try {
      const post = req.body;
      if (!post._id) {
        res.status(400).json({ message: ` ID does not exist` });
      }
      const updatedPost = await User.findByIdAndUpdate(post._id, post, {
        new: true,
      });
      return res.json(updatedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async postDelete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json(` ID was not found`);
      }
      const deletedPost = await User.findByIdAndDelete(id);
      return res.json(deletedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
