import type { PageInfo } from '@/features/shared/types';
import type { TagDto } from './tags';

export type ArticleListRequest = PageInfo & {
    articleTitle?: string;
    topicId?: number;
    isTopicSummary?: boolean;
    isHidden?: boolean;
    userId?: number;
    tags?: string[] | null;
};


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
    userAvatar: string;
    sortNumber: number;
    isHidden: boolean;
    createdAt: string;
    updatedAt: string;
    tags: TagDto[];
}

export type PagedArticleDto = {
    data: ArticleDto[];
    pageRequest: PageInfo;
    totalCount: number;
    totalPages: number;
}

export type ArticleBase = {
    title: string;
    content: string;
    description: string;
    imageUrl: string;
    topicId: string;
    isTopicSummary: boolean;
    sortNumber: number;
    isHidden: boolean;
    tags?: string[];
};

export type ArticleCreateRequest = ArticleBase;

export type ArticleUpdateRequest = Partial<ArticleBase> & {
    articleId: number;
};

