export interface IArticle {
  title: string;
  link: string;
  description: string;
  preview: string;
  content: string;
  onMainPage: boolean;
  viewCount: number;
  author: string;
  createdAt: string;
  updatedAt?: string;
}