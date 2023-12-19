import { Article } from "../models/article.model";
import { IArticle } from "../types/IArticle";

class ArticleService {
    async getMainArticles () {
        return await Article.find({onMainPage: true}).sort({_id: -1}).limit(3);
    };

    async getArticles () {
        return await Article.find().sort({ _id: -1 });
    };

    async getArticle (id: string) {
        return await Article.findOne({ link: id });
    };

    async viewArticle (id: string) {
        return await Article.findOneAndUpdate({link: id}, { $inc: { viewCount: 1 } }, {
            multi: true,
            new: true,
        });
    };

    async addArticle (body: any, files: any) {
        const filesNames = files.map((file: any) => file.filename);

        const newArticle: IArticle = {
            title: body.title,
            description: body.description,
            preview: filesNames[0],
            content: body.content,
            onMainPage: JSON.parse(body.onMainPage),
            viewCount: JSON.parse(body.viewCount) | 0,
            author: body.author,
            createdAt: new Date().toISOString(),
            link: body.link
        }

        const article = new Article(newArticle);
        const result = await article.save();
        return result;
    };

    async deleteArticle (id: string) {
        return await Article.findByIdAndDelete(id);
    };

    async updateArticle (id: string, body: any) {
        const newArticle: any = {
            title: body.title,
            description: body.description,
            content: body.content,
            onMainPage: JSON.parse(body.onMainPage),
        }

        if(body.updatedAt){
            newArticle.updatedAt = body.updatedAt;
        }

        if(body.link){
            newArticle.link = body.link;
        }

        return await Article.findByIdAndUpdate(id, newArticle, { new: true });
    };

};

export default new ArticleService();