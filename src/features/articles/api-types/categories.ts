export type CategoryDto = {
    categoryId: number;
    name: string;
    description: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
    categoryTopics: CategoryTopicDto[];
}

export type CategoryTopicDto = {
    topicId: number;
    name: string;
    description: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
}

export type CategoryBase = {
    name: string;
    description: string;
    imageUrl: string;
    sortNumber: number;
    isHidden: boolean;
}
export type CategoryCreateRequest = CategoryBase;

export type CategoryUpdateRequest = Partial<CategoryBase> & {
    categoryId: number;
    topics: CategoryTopicUpdateRequest[];
}
export type CategoryTopicUpdateRequest = {
    topicId: number;
    name: string;
    sortNumber: number;
    isHidden: boolean;
}