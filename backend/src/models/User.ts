export interface IUser {
  id: number;
  email: string;
  name: string;
  password: string;
  role: 'USER' | 'VENDOR';
  phone?: string;
  city?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IUserWithoutPassword extends Omit<IUser, 'password'> {}