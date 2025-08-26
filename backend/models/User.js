const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  googleId: String,
  username:{type: String, required: true, unique: true},
  firstName:{ type:String, required: true},
  lastName:{ type:String, required: true},
  password:{ type:String, required: true},
  email:{ type:String, required: true, unique: true},
  bio:{ type:String, default: ''},
  country:{ type:String, default: ''},
  state: { type: String,  },
  city: { type: String,  },
  pincode: { type: String,  },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  profilePicture:{ type:String, default: ''},
  createdAt:{ type:Date, default: Date.now },
  updatedAt:{ type:Date, default: Date.now }

}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);