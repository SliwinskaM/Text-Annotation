import express from 'express';
import bodyParser from "body-parser";
import mongoose from 'mongoose';
import cors from 'cors';

import postsRoutes from "./routes/posts.js";

const app = express();

app.use('/post', postsRoutes);

app.use(bodyParser.json({ limit: "30mb", extended: true }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors());

 //TODO: change mongodb host
mongoose.connect('mongodb://localhost:27017/test', {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => console.log("DB start"))
    .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false)