import { Kitchen } from "../models/kitchen.model";
import fs from 'fs';

class KitchenService {
    async getMainKitchens () {
        const kitchens = await Kitchen.find().sort({ length: -1 }).limit(5);
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
            photos: filesNames,
        }
        const kitchen = new Kitchen(newKitchen);
        const result = await kitchen.save();
        return result;
    };

    async deleteKitchen (id: string) {
        const kitchen = await Kitchen.findByIdAndDelete(id);
        kitchen?.photos.map((photo) => {
            fs.unlink(`../images/${photo}`, err => {
                if(err){
                    throw err;
                }
                console.log(`Файл ${photo} удалён`);
            });
        })
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
        }
        const kitchen = await Kitchen.findByIdAndUpdate(id, newKitchen, { new: true });
        return kitchen;
    };

};

export default new KitchenService();