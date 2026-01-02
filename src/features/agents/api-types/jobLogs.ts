import type { PageInfo } from "@/features/shared";
import type { AiModelDto } from "./aiModels";

export type JobLogDto = {
    jobLogId: number;
    userId: number;
    userName: string;
    jobType: string;
    status: string;
    createdAt: Date;
    startedAt: Date;
    completedAt: Date;
    aiModel: AiModelDto;
}

export type JobLogListRequest = PageInfo & {
    userId?: number;
    aiModelId?: number;
    jobType?: string;
    status?: string;
}