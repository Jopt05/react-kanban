import { createContext, useReducer } from "react";
import type { Task } from "../interfaces/Task.interface";
import { editTaskReducer } from "../reducers/edit-task.reducer";

export interface EditTaskContext {
    task?: Task;
    isModalOpen: boolean;
    modalAction: 'edit' | 'review' | 'create';
}

export const editTaskInitialState: EditTaskContext = {
    isModalOpen: false,
    modalAction: 'create'
}

export interface EditTaskContextProps {
    editTaskState: EditTaskContext;
    reviewTask: (task: Task) => void;
    createTask: () => void;
    editTask: (task: Task) => void;
    closeModal: () => void;
}

export const EditTaskContext = createContext({} as EditTaskContextProps);

export const EditTaskProvider = ({children}: any) => {

    const [editTaskState, editTaskDispatch] = useReducer(editTaskReducer, editTaskInitialState);

    const reviewTask = (task: Task) => {
        editTaskDispatch({ type: 'reviewTask', payload: { task } });
    }

    const createTask = () => {
        editTaskDispatch({ type: 'createTask' });
    }

    const editTask = (task: Task) => {
        editTaskDispatch({ type: 'editTask', payload: { task } });
    }

    const closeModal = () => {
        editTaskDispatch({ type: 'closeModal' });
    }    
    
    return (
        <EditTaskContext.Provider value={{
            editTaskState,
            reviewTask,
            createTask,
            editTask,
            closeModal
        }}>
            {children}
        </EditTaskContext.Provider>
    )
}