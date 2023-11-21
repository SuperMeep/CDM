const mongoose = require("mongoose");
const { userRoles } = require("../constants/constants");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
  },
  studentNumber: {
    type: String,
    required: [true, "Please add student number"],
    unique: true,
  },

  password: {
    type: String,
    required: [true, "Please add a password"],
  },

  role: {
    type: String,
    enum: [userRoles.STUDENT, userRoles.REGISTRAR, userRoles.ADMIN],
    default: userRoles.STUDENT,
  },
});

module.exports = mongoose.model("User", userSchema);
