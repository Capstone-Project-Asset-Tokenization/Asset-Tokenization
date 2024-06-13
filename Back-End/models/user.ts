import { Document, Schema, model, Model, UpdateQuery } from "mongoose";
import { IUser } from "../types/user";
import bcrypt from "bcrypt";

interface IUserDocument extends IUser, Document {
  comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUser, IUserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String },
    nationalID: { type: String, required: true },
    email: { type: String, required: true },
    walletAddress: { type: String },
    roles: {
      type: [String],
      enum: ["ADMIN", "USER", "APPROVER"],
      default: ["USER"],
    },
    password: { type: String },
    isVerified: { type: Boolean, default: false },
    emailToken: { type: String },
    isBanned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// Add password hash method for save
userSchema.pre<IUserDocument>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Add password hash method for findOneAndUpdate
userSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();
  
  if (update) {
    const updateDoc = update as UpdateQuery<IUserDocument>;
    if (updateDoc.password) {
      updateDoc.password = await bcrypt.hash(updateDoc.password, 10);
    }
  }

  next();
});

// Add password compare method
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser, IUserModel>("User", userSchema);

export default User;
