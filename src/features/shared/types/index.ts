export type PageRequest = {
    pageNumber: number;
    pageSize: number;
    sortField: string;
    isAscending: boolean;
}
export type LookupItemDto = {
    id: number;
    name: string;
}