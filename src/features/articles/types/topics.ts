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
    
}

export type TopicArticleDto = {
    articleId: number;
    title: string;
    description: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
    tags: string[];
}