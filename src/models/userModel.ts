import { model, models, Schema } from "mongoose";
import bcrypt from "bcryptjs";
export interface IUser extends Document {
  name?: string;
  email: string;
  password: string;
  role?: string;
  createdAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  isModified(path: string): boolean;
}

const userSchema = new Schema<IUser>({
  name: { type: String },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
// middleware to hash password before saving to the database
userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

//method on schema to compare the password while login
userSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = models.User || model<IUser>("User", userSchema);

export default User;
