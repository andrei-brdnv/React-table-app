import data from "../../data";
import {ADD_DATA_ITEM, DELETE_DATA_ITEM, EDIT_DATA_ITEM} from "../types";

export default function (initState = data, action) {
    switch (action.type) {
        case DELETE_DATA_ITEM:
            return initState.filter(dataItem => dataItem.id !== action.payload.id)
        case ADD_DATA_ITEM:
            return [
                ...initState,
                {
                    id: action.randomId,
                    ...action.payload.dataItem
                }
            ]
        case EDIT_DATA_ITEM:
            const {id, editedValue} = action.payload
            const newState = initState.map(dataItem => {
                if (dataItem.id === id) return Object.assign({}, dataItem, editedValue)
                return dataItem
            })
            return newState
        default:
            return initState
    }
}