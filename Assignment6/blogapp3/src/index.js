import express from 'express';
import { dbconnection } from './DataBase/dbconnection.js';
import './DataBase/Models/FKs.js';
import userController from './users/user.controller.js';
import postController from './posts/posts.controller.js';
import commentController from './comments/comments.controller.js';

const app = express();
const port = 3000;

app.use(express.json());

app.use('/users', userController);
app.use('/posts', postController);
app.use('/comments', commentController);

app.get('/', (req, res) => {
    return res.status(200).json({ message: "Welcome At Blogg App" })
})

dbconnection();

app.use((req, res, next) => {
    return res.status(404).json({ message: "Page Not Found 404" })
})

app.use((err, req, res, next) => {
    return res.status(500).json({ message: "internal server error", error: err.message })
})

app.listen(port, () => { console.log(`Server Connected at Port ${port}`) })