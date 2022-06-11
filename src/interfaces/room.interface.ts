export type TRoomType = 'personal' | 'matrimonial' | 'group';

export interface IRoom {
  id: string;
  name: string;
  floor: number;
  hasBathroom: boolean;
  type: TRoomType;
  isReserved: boolean;
  createdAt: string;
  updatedAt: string;
}
