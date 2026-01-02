import type { PageInfo } from "@/features/shared";
import type { JobLogDto } from "./jobLogs";

export type ExecutionLogDto = {
    executionLogId: number;
    jobLog: JobLogDto;
    executedAt: Date;
    executionPayloadId: number;
    inputTokens: number;
    outputTokens: number;
    reasoningTokens: number;
    cost: number;
    isSuccessful: boolean;
    errorMessage: string;
    durationSeconds: number;
}

export type ExecutionLogListRequest = PageInfo & {
    userId?: number;
    aiModelId?: number;
    isSuccessful?: boolean;
}