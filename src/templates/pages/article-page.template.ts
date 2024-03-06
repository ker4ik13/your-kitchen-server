import { SITE_URL } from "../../helpers/constants";
import type { IArticle } from "../../types/IArticle";
import { articleCardTemplate } from "../rss/article-card.template";

export const articlePageTemplate = (
  article: IArticle,
  moreArticles: IArticle[],
): string => {
  return `<div class="articlePage">
		<div class="articlePreviewWrapper">
			<img src="${SITE_URL}/images/${article.preview}" alt="${
        article.title
      }" class="articlePreviewImg">
			<div class="articlePage_viewCount">
				<p>${article.viewCount || 0}</p>
			</div>
		</div>
		<div class="article_content">
			<h6>${article.description}</h6> <br/> ${article.content}
		</div>
		<div class="readMore">
			<p class="readMore__line"></p>
			<p class="reatMore__text">Читать другие статьи</p>
			<p class="readMore__line"></p>
		</div>
		<div class="moreArticles">
			${moreArticles
        .filter((item) => item.link !== article.link)
        .slice(0, 3)
        .map((moreArticleItem) => articleCardTemplate(moreArticleItem))}
		</div>
	</div>`;
};
