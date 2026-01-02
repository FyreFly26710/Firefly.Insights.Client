export type AiModelDto = {
    aiModelId: number;
    provider: string;
    model: string;
    modelId: string;
    inputPrice: number;
    outputPrice: number;
    isActive: boolean;
}

// export interface AiModelListRequest {
//     provider?: string;
//     isActive?: boolean;
// }