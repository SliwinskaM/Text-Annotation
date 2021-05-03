import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    message: String,
    selectedFile: String,
})

var AddDocument = mongoose.model('AddDocument', postSchema);

export default AddDocument;