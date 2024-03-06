import { SITE_URL } from "../../helpers/constants";
import type { IArticle } from "../../types/IArticle";
import { articleRssTemplate } from "../rss";

// <turbo:analytics></turbo:analytics>

export const articlesChannelTemplate = (
  articles: IArticle[] | any[],
): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <rss xmlns:yandex="http://news.yandex.ru"
        xmlns:media="http://search.yahoo.com/mrss/"
        xmlns:turbo="http://turbo.yandex.ru"
        version="2.0">
        <channel>
            <!-- Информация о сайте-источнике -->
            <title>Полезные статьи про кухни</title>
            <link>${SITE_URL}articles/</link>
            <description>Статьи о мебели для кухни: организация пространства, дизайн и стиль кухни, материалы, нюансы и тонкости проектирования. Рекомендации по выбору кухонной мебели на заказ, ответы на частые вопросы.</description>
            <language>ru</language>

            ${articles.map((article) => {
              return articleRssTemplate(article);
            })}
        </channel>
    </rss>`;
};
