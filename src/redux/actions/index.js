import {ADD_DATA_ITEM, CHANGE_SELECTION, DELETE_DATA_ITEM, EDIT_DATA_ITEM} from "../types";

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

export const editDataItem = (id, editedValue) => {
    return {
        type: EDIT_DATA_ITEM,
        payload: {id, editedValue}
    }
}

export const changeSelection = (selected) => ({
    type: CHANGE_SELECTION,
    payload: {selected}
})