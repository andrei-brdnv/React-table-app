import data from "../../data";
import {ADD_DATA_ITEM, DELETE_DATA_ITEM, EDIT_DATA_ITEM, REORDER_ITEMS} from "../types";

export default function (initState = data, action) {
    switch (action.type) {
        case DELETE_DATA_ITEM:
            return initState.filter(dataItem => dataItem.id !== action.payload.id)
        case ADD_DATA_ITEM:
            return [
                ...initState,
                {
                    id: action.randomId,
                    ...action.payload.dataItem,
                    colorRgb: action.colorRgb
                }
            ]
        case EDIT_DATA_ITEM:
            const {id, editedValue} = action.payload
            const newState = initState.map(dataItem => {
                if (dataItem.id === id) return Object.assign({}, dataItem, editedValue)
                return dataItem
            })
            return newState
        case REORDER_ITEMS:
            const {reorderedData} = action.payload
            return reorderedData
        default:
            return initState
    }
}