
export interface Otp {
  _id?: string;
  userId: string;
  code: string;
  expiresAt: Date;
  isUsed: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}