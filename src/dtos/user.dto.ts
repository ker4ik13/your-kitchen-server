import type { IUser } from "../types/IUser";

export default class UserDto {
  email: string;
  id: string;
  isActivated: boolean;
  activationLink?: string;

  constructor (model: IUser | any) {
    this.email = model.email;
    this.id = model._id;
    this.isActivated = model.isActivated;
    this.activationLink = model.activationLink || undefined;
  }
}