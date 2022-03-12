const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: {
    type: Number,
    default: 0,
  },
})

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const hash = await bcrypt.hash(this.password, 5)
    this.password = hash
  }
  next()
})

userSchema.methods.comparePassword = async function (password) {
  const result = await bcrypt.compareSync(password, this.password)
  return result
}

module.exports = mongoose.model("User", userSchema)
