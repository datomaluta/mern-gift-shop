import mongoose, { Model, Schema } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export interface IUser extends Document {
  username: string;
  email: string;
  image: string;
  password: string;
  passwordConfirm: string | undefined;
  createdAt: Date;
  updatedAt: Date;
  passwordChangedAt: Date;
  passwordResetToken: string | undefined;
  passwordResetExpires: Date | number | undefined;
  isGoogleUser: boolean;
  isAdmin: boolean;
  createPasswordResetToken: () => string;
  correctPassword: (
    candidatePassword: string,
    userPassword: string
  ) => Promise<boolean>;
  changedPasswordAfter: (JWTtimestamp: number) => boolean;
}

const userSchema: Schema<IUser> = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: [true, "Username is required"],
    minLength: 2,
    maxLength: 4,
    validate: {
      validator: function (value: string) {
        return /^[a-z]+$/.test(value);
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid username! Only lowercase English letters are allowed!`,
    },
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  image: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/movie-quotes-34603.appspot.com/o/avatar-default-icon.png?alt=media&token=e9fcf28b-6246-4b4e-b9c7-ac6c6c5f25bc",
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 4,
    maxLength: 15,
    select: false,
    validate: {
      validator: function (value: string) {
        return /^[a-zA-Z0-9]+$/.test(value);
      },
      message: () => `Only English letters and numbers are allowed!`,
    },
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (this: IUser, value: string): boolean {
        return value === this.password;
      },
      message: () => `Passwords do not match!`,
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  isGoogleUser: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.createPasswordResetToken = function (this: IUser) {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTtimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(
      this.passwordChangedAt.getTime() / 1000
    );

    return JWTtimestamp < changedTimestamp;
  }

  return false;
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
