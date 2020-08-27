import {createSelector} from 'reselect'

export const filtersSelector = (store) => store.filters
export const dataSelector = (store) => store.data

export const filteredDataSelector = createSelector(
    filtersSelector,
    dataSelector,
    (filters, data) => {
        const {selected} = filters
        return data.filter(dataItem => {
            return (
                !selected.length || selected.find((selected) => selected.value === dataItem.id)
            )
        })
    }
)