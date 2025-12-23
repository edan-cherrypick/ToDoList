
export type Priority = 1 | 2 | 3;
  
export interface Task {
    id: number;
    description: string;
    dueDate: Date;
    priority: Priority;
    completed: boolean;
}

// types.ts
export const priorityLabelByValue: Record<Priority, string> = {
    1: 'Low',
    2: 'Medium',
    3: 'High',
};