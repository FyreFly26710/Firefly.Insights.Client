import type { PageRequest } from '@/features/shared/types';

export type ArticleListRequest = PageRequest & {
    articleTitle?: string;
}

export type ArticleDto = {
    articleId: number;
    title: string;
    content: string;
    description: string;
    imageUrl: string;
    topicId: string;
    topicName: string;
    isTopicSummary: boolean;
    userId: string;
    userName: string;
    sortNumber: number;
    isHidden: boolean;
    createdAt: string;
    updatedAt: string;
    tags: string[];
}

export type PagedArticleDto = {
    data: ArticleDto[];
    pageRequest: PageRequest;
    totalCount: number;
    totalPages: number;
}

