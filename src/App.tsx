import { useState } from 'react'
import './App.css'
import type { Task } from './types';
import TasksTable from './components/TasksTable';

function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      description: 'Buy groceries',
      dueDate: new Date('2025-12-23'),
      priority: 1,
      completed: false,
    },
    {
      id: 2,
      description: 'Clean the dishes',
      dueDate: new Date('2025-12-23'),
      priority: 2,
      completed: false,
    },
  ]);

  const handleSaveTask = (updated: Task) => {
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  }

  const handleDeleteTask = (taskToDelete: Task) => {
    setTasks(prev => prev.filter(t => (t.id !== taskToDelete.id)));
  }
  
  return (
    <div className="app-root">
      <h1>To Do List</h1>
      <TasksTable tasks={tasks} onSaveTask={handleSaveTask} onDeleteTask={handleDeleteTask}/>
    </div>
  )
}

export default App
