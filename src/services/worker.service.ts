import { Worker } from "../models/worker.model";

class WorkerService {
    async getWorkers () {
        const workers = await Worker.find();
        return workers;
    };

    async getWorker (id: string) {
        const worker = await Worker.findById(id);
        return worker;
    };

    async addWorker (body: object) {
        const worker = new Worker(body);
        const result = await worker.save();
        return result;
    };

    async deleteWorker (id: string) {
        const worker = await Worker.findByIdAndDelete(id);
        return worker;
    };

    async updateWorker (id: string, body: object) {
        const worker = await Worker.findByIdAndUpdate(id, body, { new: true });
        return worker;
    };

};

export default new WorkerService();