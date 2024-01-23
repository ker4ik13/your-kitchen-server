import { Furniture } from "../models/furniture.model";
import { IFurniture } from "../types/IFurniture";

class FurnitureService {
  async getMainFurniture() {
    return await Furniture.find({ onMainPage: true })
      .sort({ _id: -1 })
      .limit(5);
  }

  async getAllFurniture() {
    return await Furniture.find();
  }

  async getOneFurniture(link: string) {
    return await Furniture.findOne({ link });
  }

  async addFurniture(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const newFurniture: IFurniture = {
      name: body.name,
      description: body.description,
      price: +body.price,
      photos: filesNames,
      link: body.link,
    };

    if (body.onMainPage) {
      newFurniture.onMainPage = body.onMainPage;
    }

    const furniture = new Furniture(newFurniture);
    return await furniture.save();
  }

  async deleteFurniture(link: string) {
    return await Furniture.findOneAndDelete({ link });
  }

  async updateFurniture(link: string, body: any) {
    const newFurniture: any = {
      name: body.name,
      description: body.description,
      price: +body.price,
      link: body.link,
    };

    if (body.onMainPage) {
      newFurniture.onMainPage = body.onMainPage;
    }

    return await Furniture.findOneAndUpdate({ link }, newFurniture, {
      new: true,
    });
  }
}

export default new FurnitureService();
