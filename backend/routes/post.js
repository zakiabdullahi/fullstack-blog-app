import express from "express"
import { createPost, deletePost, getPostById, getPosts, updatePost } from "../controllers/postController.js";
import { validatePostRegistration } from "../validators/postValidator.js";
import { authenticate } from "../middlewares/authMiddleWare.js";


const postRouter = express.Router();


postRouter.post('/', validatePostRegistration, authenticate, createPost)
postRouter.get('/see', (req, res) => { res.send("hi ..."); });

postRouter.get('/get-posts', getPosts);
postRouter.get('/get-post/:id', getPostById);
postRouter.delete('/delete-post/:id', authenticate, deletePost);
postRouter.put('/update-post/:id', authenticate, updatePost);

// postsRouter.route("/:id")
//     .get(getPostById)
//     .put(authenticate, updatePost)
//     .delete(authenticate, deletePost);

// postsRouter.route("/")
//     .post(validatePostRegistration, authenticate, createPost)
//     .get(getPosts);


export default postRouter