import { Schema, model } from "mongoose";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>({
  firstName: {
    type: String,
    default: null,
  },
  lastName: {
    type: String,
    default: null,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});

export default model("User", userSchema);
