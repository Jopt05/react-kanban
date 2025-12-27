import type { Subtask } from "./Subtask.interface";

export interface Task {
    id:          string;
    title:       string;
    description: string;
    status:      string;
    user:        User;
    createdAt:   Date;
    updatedAt:   Date;
    deletedAt:   null;
    subtasks?:   Subtask[];
}

export interface User {
    id:        string;
    name:      string;
    email:     string;
    password:  string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: null;
}
