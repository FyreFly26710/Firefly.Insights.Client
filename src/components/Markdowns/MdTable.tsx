/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Box
} from '@mui/material';

export const MdTable = {
    table: ({ children }: any) => (
        <TableContainer
            component={Paper}
            variant="outlined"
            sx={{
                my: 3,
                overflowX: 'auto',
                borderRadius: 2,
                borderColor: 'divider',
                boxShadow: 'none'
            }}
        >
            <Table size="small">{children}</Table>
        </TableContainer>
    ),
    thead: ({ children }: any) => (
        <TableHead sx={{ backgroundColor: 'action.hover' }}>
            {children}
        </TableHead>
    ),
    tbody: ({ children }: any) => <TableBody>{children}</TableBody>,
    tr: ({ children }: any) => (
        <TableRow
            sx={{
                '&:last-child td': { borderBottom: 0 },
                '&:hover': { backgroundColor: 'action.selected' },
                transition: 'background-color 0.2s'
            }}
        >
            {children}
        </TableRow>
    ),
    th: ({ children }: any) => (
        <TableCell
            component="th"
            sx={{
                fontWeight: 'bold',
                borderBottom: '2px solid',
                borderColor: 'divider',
                py: 1.5
            }}
        >
            {children}
        </TableCell>
    ),
    td: ({ children }: any) => (
        <TableCell sx={{ borderColor: 'divider', py: 1.2 }}>
            {children}
        </TableCell>
    ),
};