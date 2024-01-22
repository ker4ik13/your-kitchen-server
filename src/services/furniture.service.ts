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

  async getOneFurniture(id: string) {
    return await Furniture.findById(id);
  }

  async addFurniture(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const newFurniture: IFurniture = {
      name: body.name,
      description: body.description,
      price: +body.price,
      photos: filesNames,
    };

    if (body.onMainPage) {
      newFurniture.onMainPage = body.onMainPage;
    }

    const furniture = new Furniture(newFurniture);
    return await furniture.save();
  }

  async deleteFurniture(id: string) {
    return await Furniture.findByIdAndDelete(id);
  }

  async updateFurniture(id: string, body: any) {
    const newFurniture: any = {
      name: body.name,
      description: body.description,
      price: +body.price,
    };

    if (body.onMainPage) {
      newFurniture.onMainPage = body.onMainPage;
    }

    return await Furniture.findByIdAndUpdate(id, newFurniture, {
      new: true,
    });
  }
}

export default new FurnitureService();
