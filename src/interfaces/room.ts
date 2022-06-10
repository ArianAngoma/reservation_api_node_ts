export enum ERoomType {
  personal = 'personal',
  matrimonial = 'matrimonial',
  group = 'group',
}

export interface IRoom {
  id: string;
  name: string;
  floor: number;
  hasBathroom: boolean;
  type: ERoomType;
  isReserved: boolean;
  createdAt: string;
  updatedAt: string;
}
