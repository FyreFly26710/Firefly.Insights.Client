export type GenerateArticleSummaryRequest = {
    provider: string;
    model: string;
    userPrompt: string;
    articleCount: number;
    categoryId: number;
    category: string;
    topic: string;
    topicDescription: string;
    topicUrl: string;
}