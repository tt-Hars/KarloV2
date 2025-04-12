import { Schema, model } from 'mongoose';
import { encryptPassword, matchPasswords } from '../utils/password';
export interface IUser { 
  name: string;
  email: string;
  password: string;
  provider: string | null;
  provider_user_id: string | null;
  subscription_details: {
    subscription_id: string;
    subscription_level: string;
    subscription_expiry: Date | null;
  };
  matchPassword?: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
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
    provider: {
      type: String,
      required: false,
      default: 'NONE',
    },
    provider_user_id: {
      type: String,
      required: false,
      default: 'NONE',
    },
    subscription_details: {
      subscription_id: {
        type: String,
        required: false,
        default: 'NONE',
      },
      subscription_level: {
        type: String,
        required: false,
        default: 'NONE',
      },
      subscription_expiry: {
        type: Date,
        required: false,
        default: null,
      }
    },
  },
  {
    timestamps: true,
  },
);

userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await matchPasswords(enteredPassword, this.password);
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await encryptPassword(this.password);
  next();
});

const User = model('User', userSchema);

export default User;
