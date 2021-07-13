import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  document_Id: String,
  relation_name: String,
  relation_power: Number,
  word1: String,
  word2: String,
  word1_position: Array,
  word2_position: Array,
})


var Relation = mongoose.model('Relation', postSchema);

export default Relation;