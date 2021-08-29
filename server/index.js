import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/add.js';
import labelRoutes from './routes/label.js';
import relationRoutes from './routes/relation.js'
import authRoutes from './routes/auth.js'

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());

app.use('/posts', postRoutes);
app.use('/labels', labelRoutes);
app.use('/', authRoutes)
app.use('/relations', relationRoutes);

const CONNECTION_URL = "mongodb://localhost";
const PORT = process.env.PORT || 27017;

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
    .catch((error) => console.log(`${error} did not connect`));

mongoose.set('useFindAndModify', false);

