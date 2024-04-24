// User.ts
import { Document, Schema, model, Types, Model } from 'mongoose';
import { IUser } from '../types/user';
import bcrypt from 'bcrypt';



interface IUserDocument extends IUser, Document {
    comparePassword(password: string): Promise<boolean>;
}

interface IUserModel extends Model<IUserDocument> {}

const userSchema = new Schema<IUser, IUserModel>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String},
    nationalID: { type: String, required: true },
    email: { type: String, required: true },
    walletAddress: { type: String},
    roles: {
        type: [String],
        enum: ['ADMIN', 'USER', 'APPROVER'],
        default: ['USER'],
    },
    password: { type: String }
});

// add password hash method
userSchema.pre<IUserDocument>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
}
);

// add password compare method
userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

// // filter unique constraint for optional field
// userSchema.index({ phoneNumber: 1 }, { unique: true, partialFilterExpression: { phoneNumber: { $exists: true } } });
// userSchema.index({ walletAddress: 1 }, { unique: true, partialFilterExpression: { walletAddress: { $exists: true } } });


const User = model<IUser, IUserModel>('User', userSchema);


export default User;
