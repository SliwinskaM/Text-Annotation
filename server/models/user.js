import mongoose from 'mongoose';

const user = mongoose.Schema({
  userName: String,
  password: String,
})


var User = mongoose.model('User', user);

export default User;