import Post from "./post.js";

class PostController {
  async create(req, res) {
    try {
      const { author, title, content, picture } = req.body;
      const post = await Post.create({ author, title, content, picture });
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
        res.status(400).json(` ID was not found`);
      }
      const post = await Post.findById(id);
      return res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async updatePost(req, res) {
    try {
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async postDelete(req, res) {
    try {
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
