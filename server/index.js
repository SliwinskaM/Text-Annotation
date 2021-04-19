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

const CONNECTION_URL = "mongodb://localhost"
const PORT = process.env.PORT || 27017;

mongoose.connect(CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(() => app.listen(PORT, () => console.log("DB start")))
    .catch((error) => console.log(error.message));

mongoose.set("useFindAndModify", false)