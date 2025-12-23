import {useState} from 'react';
import type { Task } from '../types';
import { priorityLabelByValue } from '../types';
import { useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender, } from '@tanstack/react-table';
import type { SortingState, ColumnDef } from '@tanstack/react-table';
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableSortLabel,
    Paper,
    TableContainer,
    Modal,
  } from '@mui/material';
import TaskDetail from './TaskDetail';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


export default function TasksTable({
    tasks,
    onSaveTask,
    onDeleteTask,
  }: { tasks: Task[]; onSaveTask: (task: Task) => void; onDeleteTask: (task: Task) => void }) {
    const [sortBy, setSortBy] = useState<SortingState>([{id: 'dueDate', desc: false}]);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [openModal, setOpenModal] = useState<boolean>(false);
    
    const handleEditButton = (task: Task) => {
        setEditingTask(task);
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
                const value = getValue<Date>();        // this is your Date object
                return value.toLocaleDateString('en-GB'); // dd/mm/yyyy
            },
        },
        {
            accessorKey: 'priority',
            header: 'Priority',
            cell: ({ row }) => priorityLabelByValue[row.original.priority], //translate priority to label
            sortingFn: 'basic',  // <-- sort by numeric priority (1,2,3)
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

    return (
      <>
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
        {editingTask && (
            <Modal open={openModal} onClose={() => setOpenModal(false)}>
                <TaskDetail
                    editingTask={editingTask}
                    setEditingTask={setEditingTask}
                    onSaveTask={onSaveTask}
                    onDeleteTask={onDeleteTask}
                    setOpenModal={setOpenModal}
                />
            </Modal>
        )}
      </>
    );
}
