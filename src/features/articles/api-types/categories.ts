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