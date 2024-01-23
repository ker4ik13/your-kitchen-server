export interface IClaim {
  _id: string;
  firstName: string;
  mobilePhone: string;
  date: string;
  email?: string | null;
  tag?: string | null;
  location?: string | null;
}
