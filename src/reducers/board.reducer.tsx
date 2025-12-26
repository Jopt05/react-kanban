import type { BoardState } from "../context/board.context";
import type { Board } from "../interfaces/Board.interface";
import type { Task } from "../interfaces/Task.interface";

type BoardAction = 
    { type: 'setSelectedBoard', payload: Board } |
    { type: 'setBoardsList', payload: Board[] } |
    { type: 'setTasksList', payload: Task[] } |
    { type: 'setSelectedTask', payload: Task }

export const boardReducer = (state: BoardState, action: BoardAction): BoardState => {
    switch (action.type) {
        case 'setSelectedBoard':
            return {
                ...state,
                selectedBoard: action.payload
            }
        case 'setBoardsList':
            return {
                ...state,
                boardsList: action.payload
            }
        case 'setTasksList':
            return {
                ...state,
                tasksList: action.payload
            }
        case 'setSelectedTask':
            return {
                ...state,
                selectedTask: action.payload
            }
        default:
            return state
    }
}