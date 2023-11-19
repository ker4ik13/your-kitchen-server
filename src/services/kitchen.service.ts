import { Kitchen } from "../models/kitchen.model";

class KitchenService {
    async getKitchens () {
        const kitchens = await Kitchen.find();
        return kitchens;
    };

    async getKitchen (id: string) {
        const kitchen = await Kitchen.findById(id);
        return kitchen;
    };

    async addKitchen (body: object) {
        const kitchen = new Kitchen(body);
        const result = await kitchen.save();
        return result;
    };

    async deleteKitchen (id: string) {
        const kitchen = await Kitchen.findByIdAndDelete(id);
        return kitchen;
    };

    async updateKitchen (id: string, body: object) {
        const kitchen = await Kitchen.findByIdAndUpdate(id, body, { new: true });
        return kitchen;
    };

};

export default new KitchenService();