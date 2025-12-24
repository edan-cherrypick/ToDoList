import { useState, useEffect } from 'react'
import './App.css'
import type { Task } from './types';
import TasksTable from './components/TasksTable';
import { Modal,
  Box
} from '@mui/material';
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import TaskDetail from './components/TaskDetail';

let id: number = 0;

function App() {
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [mode, setMode] = useState<string>("edit");  
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    if (!stored) return [];
    const parsed: Task[] = JSON.parse(stored);
    // convert dueDate strings to Date objects
    return parsed.map(t => ({ ...t, dueDate: new Date(t.dueDate) }));
  });

  useEffect(()=> {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks]);

  const handleNewTaskButton = () => {
    setMode("new");
    setEditingTask({id: id++, description: "", dueDate: new Date(), priority: 1, completed:false});
    setOpenModal(true);
  }

  const handleSaveTask = (updated: Task) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? {...updated} : t)));
    setEditingTask(null);
  }

  const handleDeleteTask = (taskToDelete: Task) => {
    setTasks(prev => prev.filter(t => (t.id !== taskToDelete.id)));
    setEditingTask(null);
  }

  const handleAddNewTask = (newTask: Task) => {
    setTasks([...tasks, newTask]);
  }
  
  return (
    <div className="app-root">
      <h1>To Do List</h1>
      <TasksTable tasks={tasks} 
        onSaveTask={handleSaveTask} 
        onDeleteTask={handleDeleteTask} 
        onAddNewTask={handleAddNewTask} 
        setMode={setMode} 
        setEditingTask={setEditingTask} 
        setOpenModal={setOpenModal}/>
      <Box
          sx={{
          display: "flex",
          justifyContent: "center",
          mt: 3,
          }}
        >
          <Fab
          color="primary"
          aria-label="add task"
          onClick={handleNewTaskButton}
          >
              <AddIcon />
          </Fab>
        </Box>
        {editingTask && (
          <Modal open={openModal} onClose={() => setOpenModal(false)}>
              <TaskDetail
                  editingTask={editingTask}
                  setEditingTask={setEditingTask}
                  onSaveTask={handleSaveTask}
                  onDeleteTask={handleDeleteTask}
                  setOpenModal={setOpenModal}
                  onAddNewTask={handleAddNewTask}
                  mode={mode}
              />
          </Modal>
        )}
    </div>
  )
}

export default App
