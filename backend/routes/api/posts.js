const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middlewares/auth");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Profile = require("../../models/Profile");

//@route  POST api/posts
//@desc   Create a post
//@access Private
router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = {
        user: req.user.id,
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
      };

      const post = new Post(newPost);

      await post.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//@route  GET api/posts
//@desc   Get all post
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    //get most recent posts first
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@route  GET api/posts/:id
//@desc   Get post by Id
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    //get most recent posts first
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

//@route  DELETE api/posts/:id
//@desc   Delete a post by Id
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    //Check user (user who owns the post, can delete the post)
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;

//NOTE: typeof post.user = ObjectId & typeof req.user.id = String
//NOTE: 401 => Not authorized
//NOTE: 404 => Not found
//NOTE: 400 => Bad request
