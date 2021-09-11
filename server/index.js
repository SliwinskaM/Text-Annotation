import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/add.js';
import labelRoutes from './routes/label.js';
import relationRoutes from './routes/relation.js'
import authRoutes from './routes/auth.js'

// const Collection = require('test/labels');
// import labelModel from './models/label.js';
// // const Json2csvParser = require("json2csv").Parser;
// import Json2csvParser from 'json2csv';
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

// app.get('/export/label', async (req, res) => {
//     console.log("here")
//     await labelModel.find({}).lean().exec((err, data) => {
//         if (err) throw err;
//         const csvFields = ['_id', 'label_name']
//         console.log(csvFields);
//         const json2csvParser = new Json2csvParser({
//             csvFields
//         });
//         const csvData = json2csvParser.parse(data);
//         fs.writeFile("C:\Users\gabri\Deskop\whatever\SP\exports\labels.csv", csvData, function(error) {
//             if (error) throw error;
//             console.log("labels.csv successfully!");
//         });
//         res.send('File downloaded Successfully')
//     });
// });

// //HOME route
// app.get('/', (req, res) => {
//     res.render('home.ejs');
// });