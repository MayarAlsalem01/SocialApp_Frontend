export type Pagination<T>={
    pageNumber:   number;
    pageSize:     number;
    totalPages:   number;
    totalRecords: number;
    data:         T[];
}