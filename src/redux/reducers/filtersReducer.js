import {CHANGE_SELECTION} from "../types";

const defaultFilters = {
    selected: []
}

export default function (filtersState = defaultFilters, action) {
    switch (action.type) {
        case CHANGE_SELECTION:
            return {
                ...filtersState,
                selected: action.payload.selected
            }
        default:
            return filtersState
    }
}