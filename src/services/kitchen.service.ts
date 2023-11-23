import { Kitchen } from "../models/kitchen.model";

class KitchenService {
    async getMainKitchens () {
        const kitchens = await (await Kitchen.find({onMainPage: true}).sort({_id: -1}).limit(5));
        return kitchens;
    };

    async getKitchens () {
        const kitchens = await Kitchen.find();
        return kitchens;
    };

    async getKitchen (id: string) {
        const kitchen = await Kitchen.findById(id);
        return kitchen;
    };

    async addKitchen (body: any, files: any) {
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
        }
        const kitchen = new Kitchen(newKitchen);
        const result = await kitchen.save();
        return result;
    };

    async deleteKitchen (id: string) {
        const kitchen = await Kitchen.findByIdAndDelete(id);
        return kitchen;
    };

    async updateKitchen (id: string, body: any) {
        const newKitchen = {
            title: body.title,
            description: body.description,
            price: +body.price,
            style: JSON.parse((body.style)),
            type: JSON.parse((body.type)),
            term: body.term,
            onMainPage: JSON.parse(body.onMainPage),
        }
        const kitchen = await Kitchen.findByIdAndUpdate(id, newKitchen, { new: true });
        return kitchen;
    };

};

export default new KitchenService();