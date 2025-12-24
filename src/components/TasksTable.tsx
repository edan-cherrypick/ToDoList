import {useState} from 'react';
import type { Task } from '../types';
import { priorityLabelByValue } from '../types';
import { useReactTable,
    getCoreRowModel,
    getSortedRowModel, } from '@tanstack/react-table';
import type { SortingState, ColumnDef } from '@tanstack/react-table';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import { useTheme, useMediaQuery } from "@mui/material";
import MobileTable from './MobileTable';
import DesktopTable from './DesktopTable';

export default function TasksTable({
    tasks,
    setMode,
    setEditingTask,
    setOpenModal,
  }: { tasks: Task[]; onSaveTask: (task: Task) => void; 
    onDeleteTask: (task: Task) => void; 
    onAddNewTask: (task: Task) => void;
    setMode: (newMode: string) => void;
    setEditingTask: (task: Task) => void;
    setOpenModal: (val: boolean) => void }) {
    const [sortBy, setSortBy] = useState<SortingState>([{id: 'dueDate', desc: false}]);

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    
    const handleEditButton = (task: Task) => {
        setMode("edit");
        setEditingTask({...task});
        setOpenModal(true);
    };
    
    const columns: ColumnDef<Task>[] = [
        {
            accessorKey: 'edit', 
            header: 'Edit',
            enableSorting: false,
            cell: ({row}) => (
                <IconButton aria-label="delete" size="small" onClick={() => handleEditButton(row.original)}>
                 <EditIcon fontSize="small" />
                </IconButton>
            )
        },
        {
            accessorKey: 'description',
            header: 'Description',
            enableSorting: false,
        },
        {
            accessorKey: 'dueDate',
            header: 'Date',
            sortingFn: 'datetime',
            cell: ({ getValue }) => {
                const value = getValue<Date>();        
                return value.toLocaleDateString('en-GB');
            },
        },
        {
            accessorKey: 'priority',
            header: 'Priority',
            cell: ({ row }) => priorityLabelByValue[row.original.priority],
            sortingFn: 'basic', 
        },
        {
            accessorKey: 'completed', 
            header: 'Completed',
            enableSorting: false,
        },
    ]

    const table = useReactTable({
        data: tasks,
        columns,
        state: {
            sorting: sortBy,
        },
        onSortingChange: setSortBy,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return isMobile ? (<MobileTable table={table}/>) : (<DesktopTable table={table}/>);
}
