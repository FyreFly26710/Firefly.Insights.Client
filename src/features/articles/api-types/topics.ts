import type { PageRequest } from "@/features/shared/types";

export type TopicListRequest = PageRequest & {
    topicName?: string;
    categoryId?: number;
    isHidden?: boolean;
}

export type TopicDto = {
    topicId: number;
    name: string;
    description: string;
    categoryId: number;
    categoryName: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
    topicArticles: TopicArticleDto[];
    createdAt: string;
    updatedAt: string;
}

export type TopicArticleDto = {
    articleId: number;
    title: string;
    description: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
    tags: string[];
    isTopicSummary: boolean;
}
export type PagedTopicDto = {
    data: TopicDto[];
    pageRequest: PageRequest;
    totalCount: number;
    totalPages: number;
}

export type TopicBase = {
    name: string;
    categoryId: number;
    description: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
};

export type TopicCreateRequest = TopicBase;

export type TopicUpdateRequest = Partial<TopicBase> & {
    topicId: number;
};