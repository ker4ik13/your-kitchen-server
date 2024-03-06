import { SITE_URL } from "../../helpers/constants";
import type { IArticle } from "../../types/IArticle";

export const articlePageTemplate = (article: IArticle): string => {
  return `<div class="articlePage">
		<h1 class="articleTitle">${article.title}</h1>
		<div class="articlePreviewWrapper">
			<img src="${SITE_URL}/images/${article.preview}" alt="${article.title}" class="articlePreviewImg">
		</div>
	</div>`;
};
