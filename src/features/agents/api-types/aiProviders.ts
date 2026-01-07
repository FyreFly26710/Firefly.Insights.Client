export type AiProviderDto = {   
    aiProviderId: number;
    name: string;
    apiKey: string;
}
export type UpdateAiProviderRequest = {
    apiKey: string;
}