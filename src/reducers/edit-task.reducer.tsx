import type { EditTaskContext } from "../context/edit-task.context";
import type { Task } from "../interfaces/Task.interface";

type EditTaskAction = 
    { type: 'reviewTask', payload: { task: Task } } |
    { type: 'createTask' } |
    { type: 'editTask', payload: { task: Task } } |
    { type: 'closeModal' }

export const editTaskReducer = (state: EditTaskContext, action: EditTaskAction): EditTaskContext => {
    switch (action.type) {
        case 'reviewTask':
            return {
                ...state,
                isModalOpen: true,
                task: action.payload.task,
                modalAction: 'review'
            }
        case 'createTask':
            return {
                ...state,
                isModalOpen: true,
                task: undefined,
                modalAction: 'create'
            }
        case 'editTask':
            return {
                ...state,
                isModalOpen: true,
                task: action.payload.task,
                modalAction: 'edit'
            }
        case 'closeModal':
            return {
                ...state,
                isModalOpen: false,
                task: undefined,
                modalAction: 'create'
            }
        default:
            return state
    }
}