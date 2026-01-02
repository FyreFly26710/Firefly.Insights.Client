export type PageInfo = {
    pageNumber: number;
    pageSize: number;
    sortField: string;
    isAscending: boolean;
}
export type LookupItemDto = {
    id: string | number;
    name: string;
}

export type LookupItem = LookupItemDto & {
    description?: string;
}
export interface Paged<T> {
    pageInfo: PageInfo;
    totalCount: number;
    totalPages: number;
    data: T[];
}