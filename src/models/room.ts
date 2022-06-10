import {model, Schema} from 'mongoose';

import {ERoomType, IRoom} from '../interfaces';

const roomType: ERoomType[] = Object.values(ERoomType);

const RoomSchema = new Schema<IRoom>({
  name: {
    type: String,
    required: true,
    trim: true,
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
    default: ERoomType.personal,
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
    __v,
    _id,
    ...room
  } = this.toObject();
  room.id = _id;
  return room;
};

export const Room = model<IRoom>('Room', RoomSchema);
