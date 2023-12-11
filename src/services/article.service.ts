import { Article } from "../models/article.model";
import { IArticle } from "../types/IArticle";

class ArticleService {
    async getMainArticles () {
        return await Article.find({onMainPage: true}).sort({_id: -1}).limit(5);
    };

    async getArticles () {
        return await Article.find();
    };

    async getArticle (id: string) {
        return await Article.findById(id);
    };

    async addArticle (body: any, files: any) {
        const filesNames = files.map((file: any) => file.filename);

        const newArticle: IArticle = {
            title: body.title,
            preview: filesNames[0],
            content: body.content,
            onMainPage: JSON.parse(body.onMainPage),
        }

        const article = new Article(newArticle);
        const result = await article.save();
        return result;
    };

    async deleteArticle (id: string) {
        return await Article.findByIdAndDelete(id);
    };

    async updateArticle (id: string, body: any) {
        const newArticle = {
            title: body.title,
            content: body.content,
            onMainPage: JSON.parse(body.onMainPage),
        }

        return await Article.findByIdAndUpdate(id, newArticle, { new: true });
    };

};

export default new ArticleService();