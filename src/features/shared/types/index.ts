export type PageInfo = {
    pageNumber: number;
    pageSize: number;
    sortField: string;
    isAscending: boolean;
}
export type LookupItemDto = {
    id: number;
    name: string;
}
export interface Paged<T> {
    pageInfo: PageInfo;
    totalCount: number;
    totalPages: number;
    data: T[];
}