import Post from "./post.js";

class PostController {
  async create(req, res) {
    try {
      const { user, email, password, role } = req.body;
      const post = await Post.create({ user, email, password, role });
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.find();
      return res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getOne(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({ message: ` ID does not exist` });
      }
      const post = await Post.findById(id);
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
      const updatedPost = await Post.findByIdAndUpdate(post._id, post, {
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
      const deletedPost = await Post.findByIdAndDelete(id);
      return res.json(deletedPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
