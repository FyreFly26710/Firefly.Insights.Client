import type { GenerateArticleSummaryRequest } from "../api-types";
import { axiosClient } from "@/features/shared/utils/axiosClient";

export const articleGenerationsApi = {
    generateArticleSummary: async (request: GenerateArticleSummaryRequest) => {
        const response = await axiosClient.post('/api/ai/article-generations/article-summary', request);
        return response.data as boolean;
    }
}