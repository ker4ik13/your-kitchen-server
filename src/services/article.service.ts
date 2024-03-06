import { Article } from "../models/article.model";
import { articlesChannelTemplate } from "../templates/channels";
import { IArticle } from "../types/IArticle";

class ArticleService {
  async getRssArticles() {
    const articles = await Article.find().sort({ _id: -1 });

    return articlesChannelTemplate(articles);
    const string = `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:yandex="http://news.yandex.ru"
        xmlns:media="http://search.yahoo.com/mrss/"
        xmlns:turbo="http://turbo.yandex.ru"
        version="2.0">
        <channel>
            <!-- Информация о сайте-источнике -->
            <title>Наши кухни</title>
            <link>https://youkuhnya.ru/portfolio/</link>
            <description>Список всех кухонь</description>
            <language>ru</language>
            <turbo:analytics></turbo:analytics>

            ${articles.map((article) => {
              return `
              <item turbo="true">
                <!-- Информация о странице -->
                <turbo:extendedHtml>true</turbo:extendedHtml>
                <link>https://youkuhnya.ru/articles/${
                  article.link || article._id
                }</link>
                <turbo:source></turbo:source>
                <turbo:topic></turbo:topic>
                <author>Твоя кухня</author>
                <metrics>
                    <yandex schema_identifier="94024143">
                        <breadcrumblist>
                            <breadcrumb url="https://youkuhnya.ru/articles/" text="Статьи"/>
                            <breadcrumb url="https://youkuhnya.ru/articles/${
                              article.link || article._id
                            }" text="${article.title}"/>
                        </breadcrumblist>
                    </yandex>
                </metrics>
                <yandex:related></yandex:related>
                <turbo:content>
                    <![CDATA[
                        <h1 class="title">${article.title}</h1>
                        <div class="content">${article.description}</div>
                    ]]>
                </turbo:content>
            </item>`;
            })}
        </channel>
    </rss>`;
    return string;
  }

  async getMainArticles() {
    return await Article.find({ onMainPage: true }).sort({ _id: -1 }).limit(3);
  }

  async getArticles() {
    return await Article.find().sort({ _id: -1 });
  }

  async getArticle(id: string) {
    return await Article.findOne({ link: id });
  }

  async viewArticle(id: string) {
    return await Article.findOneAndUpdate(
      { link: id },
      { $inc: { viewCount: 1 } },
      {
        multi: true,
        new: true,
      },
    );
  }

  async checkSlug(link: string) {
    if (!link) {
      return { valid: false };
    }

    const articleBySlug = await Article.findOne({ link });

    if (articleBySlug) {
      return { valid: false };
    }

    return { valid: true };
  }

  async addArticle(body: any, files: any) {
    const filesNames = files.map((file: any) => file.filename);

    const newArticle: IArticle = {
      title: body.title,
      description: body.description,
      preview: filesNames[0],
      content: body.content,
      onMainPage: JSON.parse(body.onMainPage),
      viewCount: JSON.parse(body.viewCount) || 0,
      author: body.author,
      createdAt: new Date().toISOString(),
      link: body.link,
      meta: JSON.parse(body.meta) || {},
    };

    const article = new Article(newArticle);
    const result = await article.save();
    return result;
  }

  async deleteArticle(id: string) {
    return await Article.findByIdAndDelete(id);
  }

  async updateArticle(id: string, body: any) {
    const newArticle: any = {
      title: body.title,
      description: body.description,
      content: body.content,
      onMainPage: JSON.parse(body.onMainPage),
      meta: body.meta,
    };

    if (body.updatedAt) {
      newArticle.updatedAt = body.updatedAt;
    }

    if (body.link) {
      newArticle.link = body.link;
    }

    if (body.viewCount) {
      newArticle.viewCount = body.viewCount;
    }

    return await Article.findByIdAndUpdate(id, newArticle, { new: true });
  }
}

export default new ArticleService();
