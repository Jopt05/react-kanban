import { createContext, useContext, useEffect, useReducer} from "react";
import type { Board } from "../interfaces/Board.interface";
import kanbanApi from "../api/kanban.api";
import { AuthContext } from "./auth.context";
import type { Task } from "../interfaces/Task.interface";
import { boardReducer } from "../reducers/board.reducer";

export interface BoardState {
    boardsList?: Board[];
    selectedBoard?: Board;
    tasksList?: Task[];
}

export const boardInitialState: BoardState = {
    boardsList: []
};

export interface BoardContextProps {
    boardState: BoardState;
    setSelectedBoard: (boardId: string) => void;
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

    return (
        <BoardContext.Provider
            value={{
                boardState,
                setSelectedBoard
            }}
        >
            {children}
        </BoardContext.Provider>
    )
}