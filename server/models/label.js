import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
  document_Id: String,
  label_name: String,
  label_whole: Array,
  b: String,
  b_position: Array,
  i: Array,
  i_position: Array,
  l: String,
  l_position: Array,
  u: String,
  u_position: Array,
  inner_id: String
})


var Label = mongoose.model('Label', postSchema);

export default Label;
