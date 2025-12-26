import { createContext, useContext, useEffect, useReducer} from "react";
import type { Board } from "../interfaces/Board.interface";
import kanbanApi from "../api/kanban.api";
import { AuthContext } from "./auth.context";
import type { Task } from "../interfaces/Task.interface";
import { boardReducer } from "../reducers/board.reducer";

export interface BoardState {
    boardsList: Board[];
    selectedBoard?: Board;
    tasksList: Task[];
    selectedTask?: Task;
}

export const boardInitialState: BoardState = {
    boardsList: [],
    tasksList: []
};

export interface BoardContextProps {
    boardState: BoardState;
    setSelectedBoard: (boardId: string) => void;
    setSelectedTask: (taskId: string) => void;
    createTask: (title: string, description: string, status: string) => Promise<void>;
    updateTask: (id: string, title: string, description: string, status: string) => Promise<void>;
    createBoard: (name: string) => Promise<void>;
}

export const BoardContext = createContext({} as BoardContextProps);

export const BoardProvider = ({children}: any) => {
    
    const { authState } = useContext( AuthContext );
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
        try {
            const response = await kanbanApi.get('/boards');
            boardDispatch({ type: 'setBoardsList', payload: response.data })
            if( response.data.length > 0 ) {
                boardDispatch({ type: 'setSelectedBoard', payload: response.data[0] })
            }
        } catch (error) {
            console.log(error)
        }
    }

    const getBoardTasks = async() => {
        try {
            const response = await kanbanApi.get(`/boards/${boardState?.selectedBoard?.id}/tasks`);
            boardDispatch({
                type: 'setTasksList',
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
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

    const createTask = async(title: string, description: string, status: string) => {
        try {
            const response = await kanbanApi.post(`/boards/${boardState?.selectedBoard?.id}/tasks`, { title, description, status });
            boardDispatch({
                type: 'setTasksList',
                payload: [...boardState?.tasksList, response.data]
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
                payload: boardState?.tasksList?.map(task => task.id === id ? response.data : task)
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

    return (
        <BoardContext.Provider
            value={{
                boardState,
                setSelectedBoard,
                setSelectedTask,
                createTask,
                updateTask,
                createBoard
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}