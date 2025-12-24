import type { Task } from '../types';
import { flexRender, } from '@tanstack/react-table';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    Paper,
    TableContainer,
    Box
  } from '@mui/material';
import type { Table as typeTable } from "@tanstack/react-table";

interface DesktopTableProps {
    table: typeTable<Task>;
  }

export default function DesktopTable ({ table }: DesktopTableProps) {
    return (
        <>
        <Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map(header => {
                            if (header.isPlaceholder) return null;
                            const canSort = header.column.getCanSort();
                            const isSorted = header.column.getIsSorted(); // 'asc' | 'desc' | false

                            return (
                            <TableCell key={header.id}>
                                {canSort ? (
                                <TableSortLabel
                                    active={!!isSorted}
                                    direction={isSorted === 'desc' ? 'desc' : 'asc'}
                                    onClick={header.column.getToggleSortingHandler()}
                                >
                                    {flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                                </TableSortLabel>
                                ) : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                            </TableCell>
                            );
                        })}
                        </TableRow>
                    ))}
                    </TableHead>

                    <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                        {row.getVisibleCells().map(cell => (
                            <TableCell key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        </>
    );
}