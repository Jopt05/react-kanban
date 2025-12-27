import { createContext, useContext, useEffect, useReducer} from "react";
import type { Board } from "../interfaces/Board.interface";
import kanbanApi from "../api/kanban.api";
import { AuthContext } from "./auth.context";
import type { Task } from "../interfaces/Task.interface";
import { boardReducer } from "../reducers/board.reducer";
import type { Subtask } from "../interfaces/Subtask.interface";
import { LoaderContext } from "./loader.context";

export interface BoardState {
    boardsList: Board[];
    selectedBoard?: Board;
    tasksList: Task[];
    selectedTask?: Task;
}

export const boardInitialState: BoardState = {
    boardsList: [],
    tasksList: [],
};

export interface BoardContextProps {
    boardState: BoardState;
    setSelectedBoard: (boardId: string) => void;
    setSelectedTask: (taskId: string) => void;
    createTask: (title: string, description: string, status: string, subtasks: Partial<Subtask>[]) => Promise<void>;
    updateTask: (id: string, title: string, description: string, status: string) => Promise<void>;
    createBoard: (name: string) => Promise<void>;
    updateSubtask: (taskId: string, subtaskId: string, isCompleted: boolean, title: string) => Promise<void>;
    createSubtask: (taskId: string, title: string) => Promise<void>;
    deleteSubtask: (taskId: string, subtaskId: string) => Promise<void>;
}

export const BoardContext = createContext({} as BoardContextProps);

export const BoardProvider = ({children}: any) => {
    
    const { authState } = useContext( AuthContext );
    const { hideLoader, showLoader } = useContext( LoaderContext );
    const [boardState, boardDispatch] = useReducer(boardReducer, boardInitialState);

    useEffect(() => {
        if( !authState.isLoggedIn ) return;
        getUserBoards();
    }, [authState])

    useEffect(() => {
        if( !boardState?.selectedBoard ) return;
        getBoardTasks();
    }, [boardState?.selectedBoard])

    const getUserBoards = async() => {
        showLoader();
        try {
            const response = await kanbanApi.get('/boards');
            boardDispatch({ type: 'setBoardsList', payload: response.data })
            if( response.data.length > 0 ) {
                boardDispatch({ type: 'setSelectedBoard', payload: response.data[0] })
            }
        } catch (error) {
            console.log(error)
        }
        hideLoader();
    }

    const getBoardTasks = async() => {
        showLoader();
        try {
            const response = await kanbanApi.get(`/boards/${boardState?.selectedBoard?.id}/tasks`);
            boardDispatch({
                type: 'setTasksList',
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
        hideLoader();
    }

    const setSelectedBoard = (boardId: string) => {
        const board = boardState?.boardsList?.find(board => board.id === boardId);
        if( !board ) return;
        boardDispatch({ type: 'setSelectedBoard', payload: board })
    }

    const setSelectedTask = (taskId: string) => {
        const task = boardState?.tasksList?.find(task => task.id === taskId);
        if( !task ) return;
        boardDispatch({ type: 'setSelectedTask', payload: task })
    }

    const createTask = async(title: string, description: string, status: string, subtasks: Partial<Subtask>[]) => {
        try {
            const response = await kanbanApi.post(`/boards/${boardState?.selectedBoard?.id}/tasks`, { title, description, status });
            
            let subtasksList: Subtask[] = [];

            for (const subtask of subtasks) {
                const subtaskResponse = await kanbanApi.post(`/tasks/${response.data.id}/subtasks`, { title: subtask.title, isCompleted: false });
                subtasksList.push(subtaskResponse.data)
            }
            
            boardDispatch({
                type: 'setTasksList',
                payload: [...boardState?.tasksList, { ...response.data, subtasks: subtasksList }]
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateTask = async(id: string, title: string, description: string, status: string) => {
        try {
            const response = await kanbanApi.put(`/boards/${boardState?.selectedBoard?.id}/tasks/${id}`, { title, description, status });
            boardDispatch({
                type: 'setTasksList',
                payload: boardState?.tasksList?.map(task => task.id === id ? {...task, ...response.data} : task)
            })
        } catch (error) {
            console.log(error)
        }
    }

    const createBoard = async(name: string) => {
        try {
            const response = await kanbanApi.post('/boards', { name });
            boardDispatch({
                type: 'setBoardsList',
                payload: [...boardState?.boardsList, response.data]
            })
        } catch (error) {
            console.log(error)
        }
    }

    const updateSubtask = async(taskId: string, subtaskId: string, isCompleted: boolean, title: string) => {
        try {
            const response = await kanbanApi.put(`/tasks/${taskId}/subtasks/${subtaskId}`, { isCompleted, title });

            let task = boardState?.tasksList?.find(task => task.id === taskId);
            if(!task) return;
            
            let subtask = task.subtasks?.find(subtask => subtask.id === subtaskId);
            if(!subtask) return;

            boardDispatch({
                type: 'setTasksList',
                payload: boardState?.tasksList?.map(
                    task => task.id === taskId 
                        ? {...task, subtasks: task.subtasks?.map(
                            subtask => subtask.id === subtaskId 
                                ? {...subtask, ...response.data} 
                                : subtask
                        )} 
                        : task
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    const createSubtask = async(taskId: string, title: string) => {
        try {
            const response = await kanbanApi.post(`/tasks/${taskId}/subtasks`, { title });
            boardDispatch({
                type: 'setTasksList',
                payload: boardState?.tasksList?.map(
                    task => task.id === taskId 
                        ? {...task, subtasks: [...task.subtasks || [], response.data]} 
                        : task
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    const deleteSubtask = async(taskId: string, subtaskId: string) => {
        try {
            await kanbanApi.delete(`/tasks/${taskId}/subtasks/${subtaskId}`);
            boardDispatch({
                type: 'setTasksList',
                payload: boardState?.tasksList?.map(
                    task => task.id === taskId 
                        ? {...task, subtasks: task.subtasks?.filter(subtask => subtask.id !== subtaskId)} 
                        : task
                )
            })
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <BoardContext.Provider
            value={{
                boardState,
                setSelectedBoard,
                setSelectedTask,
                createTask,
                updateTask,
                createBoard,
                updateSubtask,
                createSubtask,
                deleteSubtask
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}