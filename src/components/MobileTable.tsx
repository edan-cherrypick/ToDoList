import { ArrowUpward, ArrowDownward } from "@mui/icons-material";
import { flexRender } from "@tanstack/react-table";
import type { Task } from "../types";
import {
    Paper,
    Box, 
  } from '@mui/material';
  import type { Table } from "@tanstack/react-table";

  interface MobileTableProps {
    table: Table<Task>;
  }

export default function MobileTable ({ table }: MobileTableProps) {
    return (
        <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {table.getRowModel().rows.map((row) => (
                <Paper key={row.id} sx={{ p: 2 }}>
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                    {row.getVisibleCells().map((cell) => {
                        const column = cell.column;
                        const canSort = column.getCanSort();
                        const isSorted = column.getIsSorted();
                        
                        const headerLabel =
                        typeof column.columnDef.header === "function"
                        ? column.columnDef.header({ column } as any) 
                        : column.columnDef.header;


                        return (
                            <Box
                            sx={{
                                color: "text.primary",
                                fontSize: 14,
                                display: "flex",
                                alignItems: "center",
                                cursor: canSort ? "pointer" : "default",
                            }}
                            onClick={canSort ? column.getToggleSortingHandler() : undefined}
                            >
                            <Box sx={{ fontWeight: "bold", mr: 1 }}>{headerLabel}:</Box>
                            {flexRender(column.columnDef.cell, cell.getContext())}
                            {isSorted ? (
                                isSorted === "asc" ? (
                                <ArrowUpward sx={{ fontSize: 16, ml: 0.5 }} />
                                ) : (
                                <ArrowDownward sx={{ fontSize: 16, ml: 0.5 }} />
                                )
                            ) : null}
                            </Box>
                        );
                    })}
                    </Box>
                </Paper>
                ))}
            </Box>
        </>
    );
}
