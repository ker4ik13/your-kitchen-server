import { KitchensOptions } from "./KitchenOptions";

export interface IKitchen {
  _id: string;
  title: string;
  description: string;
  price: number;
  options: KitchensOptions[];
  photos: string[];
  term: string;
  slug: string;
  meta: {
    keywords?: string;
    description?: string;
    title?: string;
  };
}
