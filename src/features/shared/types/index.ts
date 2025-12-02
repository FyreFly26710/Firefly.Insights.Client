export type PageRequest = {
    pageNumber: number;
    pageSize: number;
    sortField: string;
    sortOrder: 'asc' | 'desc';
}