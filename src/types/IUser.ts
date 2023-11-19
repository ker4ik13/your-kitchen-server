export interface IUser {
  _id: string;
  email: string;
  password: string;
  isActivated: boolean;
  activationLink: string;
}