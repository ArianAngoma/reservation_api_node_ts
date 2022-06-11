import {model, Schema} from 'mongoose';

import {TUserRole, IUser} from '../interfaces';

const userRole: TUserRole[] = ['admin', 'client'];

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  identification: {
    type: Number,
    required: true,
    trim: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
    enum: userRole,
    default: 'client',
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
}, {
  timestamps: true,
});

UserSchema.methods.toJSON = function() {
  const {
    __v,
    _id,
    ...user
  } = this.toObject();
  user.id = _id;
  return user;
};

export const User = model<IUser>('User', UserSchema);
