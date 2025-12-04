// import * as React from 'react';
// import { DataGrid, type GridColDef, type GridSortModel } from '@mui/x-data-grid';

// type Row = { id: number; name: string; age: number };

// export default function ServerSideTable() {
//     const [rows, setRows] = React.useState<Row[]>([]);
//     const [rowCount, setRowCount] = React.useState(0);
//     const [page, setPage] = React.useState(0);
//     const [pageSize, setPageSize] = React.useState(5);
//     const [sortModel, setSortModel] = React.useState<GridSortModel>([]);

//     const fetchData = React.useCallback(async () => {
//         const sortField = sortModel[0]?.field ?? '';
//         const sortOrder = sortModel[0]?.sort ?? '';
//         const response = await fetch(
//             `/api/users?page=${page + 1}&pageSize=${pageSize}&sortField=${sortField}&sortOrder=${sortOrder}`
//         );
//         const data = await response.json();
//         setRows(data.items);
//         setRowCount(data.total);
//     }, [page, pageSize, sortModel]);

//     React.useEffect(() => {
//         fetchData();
//     }, [fetchData]);

//     const columns: GridColDef[] = [
//         { field: 'id', headerName: 'ID', width: 70 },
//         { field: 'name', headerName: 'Name', width: 200 },
//         { field: 'age', headerName: 'Age', width: 100 },
//     ];

//     return (
//         <div style={{ height: 400, width: '100%' }}>
//             <DataGrid
//                 rows={rows}
//                 columns={columns}
//                 rowCount={rowCount}
//                 pagination
//                 page={page}
//                 pageSize={pageSize}
//                 paginationMode="server" // enable server-side pagination
//                 onPageChange={(newPage) => setPage(newPage)}
//                 onPageSizeChange={(newSize) => setPageSize(newSize)}
//                 sortingMode="server" // enable server-side sorting
//                 sortModel={sortModel}
//                 onSortModelChange={(model) => setSortModel(model)}
//             />
//         </div>
//     );
// }
