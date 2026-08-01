import { model, Schema } from "mongoose";
import { Otp } from "../../../domain/user/entities/otp.entity";

const otpSchema = new Schema<Otp>(
  {
    userId: {
      type: String,
      required: true,
      index: true,
    },

    code: {
      type: String,
      required: true,
    },

    expiresAt: {
      type: Date,
      required: true,
    },

    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

const OtpModel = model<Otp>("Otp", otpSchema);

export default OtpModel;
