import { Kitchen } from "../models/kitchen.model";

class KitchenService {
  async getMainKitchens() {
    return await Kitchen.find({ onMainPage: true }).sort({ _id: -1 }).limit(5);
  }

  async getKitchens() {
    return await Kitchen.find();
  }

  async getKitchenById(id: string) {
    return await Kitchen.findById(id);
  }
  async getKitchenBySlug(slug: string) {
    const kitchenBySlug = await Kitchen.findOne({ slug });

    if (!kitchenBySlug) {
      return await Kitchen.findById(slug);
    }

    return kitchenBySlug;
  }

  async addKitchen(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const newKitchen = {
      title: body.title,
      description: body.description,
      price: +body.price,
      style: JSON.parse(body.style),
      type: JSON.parse(body.type),
      term: body.term,
      onMainPage: JSON.parse(body.onMainPage),
      photos: filesNames,
      slug: body.slug,
      meta: JSON.parse(body.meta),
    };
    const kitchen = new Kitchen(newKitchen);
    return await kitchen.save();
  }

  async deleteKitchen(id: string) {
    return await Kitchen.findByIdAndDelete(id);
  }

  async updateKitchen(id: string, body: any) {
    const newKitchen = {
      title: body.title,
      description: body.description,
      price: +body.price,
      style: JSON.parse(body.style),
      type: JSON.parse(body.type),
      term: body.term,
      onMainPage: JSON.parse(body.onMainPage),
      slug: body.slug,
      meta: JSON.parse(body.meta),
    };
    return await Kitchen.findByIdAndUpdate(id, newKitchen, {
      new: true,
    });
  }
}

export default new KitchenService();
