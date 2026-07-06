import { model, Schema } from "mongoose";
import { UserRole } from "../../../shared/enums/user-role.enum";
import { UserStatus } from "../../../shared/enums/user-status.enum";


const userSchema = new Schema(
  {
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

    role: {
      type: String,
      enum: Object.values(UserRole),
      required: true,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      required: true,
    },

    isVerified: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
const UserModel = model("User", userSchema);

export default UserModel;
