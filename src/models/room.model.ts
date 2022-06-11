import {model, Schema} from 'mongoose';

import {TRoomType, IRoom} from '../interfaces';

const roomType: TRoomType[] = ['personal', 'group', 'matrimonial'];

const RoomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  floor: {
    type: Number,
    required: true,
    min: 1,
  },
  hasBathroom: {
    type: Boolean,
    required: true,
    default: false,
  },
  type: {
    type: String,
    required: true,
    enum: roomType,
    default: 'personal',
  },
  isReserved: {
    type: Boolean,
    required: true,
    default: false,
  },
}, {
  timestamps: true,
});

RoomSchema.methods.toJSON = function() {
  const {
    // eslint-disable-next-line no-unused-vars
    __v,
    _id,
    ...room
  } = this.toObject();
  room.id = _id;
  return room;
};

export const Room = model<IRoom>('Room', RoomSchema);
