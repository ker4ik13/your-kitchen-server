import { Claim } from "../models/claim.model";

class ClaimService {
    async getClaims () {
        const claims = await Claim.find();
        return claims;
    };

    async getClaim (id: string) {
        const claim = await Claim.findById(id);
        return claim;
    };

    async addClaim (body: object) {
        const claim = new Claim(body);
        const result = await claim.save();
        return result;
    };

    async deleteClaim (id: string) {
        const claim = await Claim.findByIdAndDelete(id);
        return claim;
    };

    async updateClaim (id: string, body: object) {
        const claim = await Claim.findByIdAndUpdate(id, body, { new: true });
        return claim;
    };

};

export default new ClaimService();