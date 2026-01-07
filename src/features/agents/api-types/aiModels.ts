export type AiModelDto = {
    aiModelId: number;
    provider: string;
    aiProviderId: number;
    model: string;
    modelId: string;
    inputPrice: number;
    outputPrice: number;
    isActive: boolean;
    displayName: string;
    avatar: string;
    description: string;
}

export type AiModelBase = {
    // provider: string;
    aiProviderId: number;
    model: string;
    modelId: string;
    inputPrice: number;
    outputPrice: number;
    isActive: boolean;
    displayName: string;
    avatar: string;
    description: string;
}
export type AiModelCreateRequest = AiModelBase & { 
    // do not have provider in the request
}

// do not have provider in the request
export type AiModelUpdateRequest = Partial<AiModelBase> 
