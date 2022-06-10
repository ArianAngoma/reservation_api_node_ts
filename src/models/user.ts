import {model, Schema} from 'mongoose';

import {EUserRole, IUser} from '../interfaces';

const userRole: EUserRole[] = Object.values(EUserRole);

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
  role: {
    type: String,
    required: true,
    enum: userRole,
    default: EUserRole.client,
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
