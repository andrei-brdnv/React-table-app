export function arrToMap(arr) {
    return arr.reduce(
        (acc, item) => ({
            ...acc,
            [item.id]: item
        }),
        {}
    )
}

export const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};