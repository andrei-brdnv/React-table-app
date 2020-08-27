import {ADD_DATA_ITEM, DELETE_DATA_ITEM} from "../types";

export const addDataItem = (dataItem) => {
    return {
        type: ADD_DATA_ITEM,
        payload: {dataItem},
        generateId: true
    }
}

export const deleteDataItem = (id) => {
    return {
        type: DELETE_DATA_ITEM,
        payload: {id}
    }
}