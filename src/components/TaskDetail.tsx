import { type ChangeEvent } from 'react';
import type { Task } from '../types';
import { Typography,
    Box,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    NativeSelect,
    TextField,
 } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


type Props = {
    editingTask: Task
    setEditingTask: (task: Task) => void
    onSaveTask: (task: Task) => void
    onDeleteTask: (task: Task) => void 
    setOpenModal: (open: boolean) => void
    onAddNewTask: (task: Task) => void
    mode: string
  }


export default function TaskDetail({
    editingTask,
    setEditingTask,
    onSaveTask,
    onDeleteTask,
    setOpenModal,
    onAddNewTask,
    mode,
  }: Props) {

    const handleSaveButton = () => { 
        if(editingTask) {
            onSaveTask(editingTask)
        };
        setOpenModal(false);
    };

    const handleDeleteButton = () => {
        if(editingTask) {
            onDeleteTask(editingTask)
        };
        setOpenModal(false);
    }

    const handleAddNewTask = () => {
        if(editingTask) {
            onAddNewTask(editingTask)
        };
        setOpenModal(false);
    }

    const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => setEditingTask({...editingTask, description: e.target.value});
    const handlePriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const value = Number(e.target.value) as Task['priority'];
        setEditingTask({ ...editingTask, priority: value });
    };

    const handleCompleted = () =>
      setEditingTask({ ...editingTask, completed: !editingTask.completed });

    const handleDateChange = (value: Dayjs | null) =>
      setEditingTask({
        ...editingTask,
        dueDate: value ? value.toDate() : editingTask.dueDate,
      });

    return (
        <div>
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: 2,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,               
                        width: '100%',           
                    }}
                    noValidate
                    autoComplete="off"
                    >
                    <Typography variant='h6' color='grey' textAlign='center'>Task Details</Typography>
                    <TextField 
                        id="filled-basic" 
                        label="Description" 
                        variant="outlined" 
                        defaultValue={editingTask.description} 
                        onChange={handleDescriptionChange} 
                        error={editingTask.description.length===0}/>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Due date"
                            value={dayjs(editingTask.dueDate)}
                            onChange={(value) => handleDateChange(value)}
                        />
                    </LocalizationProvider>
                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Priority
                        </InputLabel>
                        <NativeSelect
                            value={editingTask.priority}
                            inputProps={{
                                name: 'priority',
                                id: 'uncontrolled-native',
                            }}
                            onChange={handlePriorityChange}
                        >
                        <option value={1}>Low</option>
                        <option value={2}>Medium</option>
                        <option value={3}>High</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControlLabel
                        label="Task Completed"
                        sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
                        control={
                        <Checkbox
                            checked={editingTask.completed}
                            onChange={handleCompleted}
                        />
                        }
                    />
                </Box>
                <Box
                    sx={{
                    display: "flex",
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: 2,
                    mt: 3,
                    }}
                >
                    <Box sx={{ display: mode === "new" ? "none" : "flex", gap: 1 }}>
                        <Button
                            variant="contained"
                            onClick={handleSaveButton}
                            disabled={editingTask.description.trim().length === 0}
                        >
                            Save
                        </Button>
                        <Button
                            color="error"
                            onClick={handleDeleteButton}
                        >
                            Delete Task
                        </Button>
                    </Box>
                    <Box
                        sx={{
                            display: mode === "edit" ? "none" : "flex", gap: 1
                        }}>
                            <Button
                            variant="contained"
                            onClick={handleAddNewTask}
                            disabled={editingTask.description.trim().length === 0}
                            >
                            Save
                        </Button>
                    </Box>
                    <Button onClick={() => setOpenModal(false)}>
                        Cancel
                    </Button>
                </Box>
            </Box>
        </div>
    )
}