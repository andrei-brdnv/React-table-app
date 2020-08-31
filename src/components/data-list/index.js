import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import DataItem from "../data-item";
import {filteredDataSelector} from "../../selectors";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {reorderItems} from "../../redux/actions";

class DataList extends Component {
    onDragEnd = result => {
        const {data, filters, reorderItems} = this.props

        if (!result.destination) {
            return;
        }

        const reorder = (list, startIndex, endIndex) => {
            const result = Array.from(list);
            const [removed] = result.splice(startIndex, 1);
            result.splice(endIndex, 0, removed);

            return result;
        };

        const reorderedData = reorder(
            data,
            result.source.index,
            result.destination.index
        );

        if (!filters.selected.length) reorderItems(reorderedData)
    };

    render() {
        console.log('render DataList')
        const {data} = this.props
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Droppable droppableId="list" ignoreContainerClipping>
                        {(provided, snapshot) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                                style={getListStyle(snapshot.isDraggingOver)}
                            >
                                {data.map((dataItem, index) =>
                                    <Draggable key={dataItem.id} draggableId={dataItem.id} index={index}>
                                        {(provided, snapshot) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={getItemStyle(
                                                    snapshot.isDragging,
                                                    provided.draggableProps.style
                                                )}
                                                ref={provided.innerRef}
                                                key={dataItem.id}
                                            >
                                                <DataItem
                                                    index={index}
                                                    dataItem={dataItem}
                                                />
                                                <hr className="hr"/>
                                            </div>
                                        )}
                                    </Draggable>
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        );
    }
}

const getItemStyle = (isDragging, draggableStyle) => ({
    background: isDragging
        ? "linear-gradient(to left, transparent, #ebe8e5 30%, #ebe8e5 70%, transparent 100%)"
        : "transparent",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver
        ? "linear-gradient(to left, #ebe8e5, #757575 30%, #757575 70%, #ebe8e5 100%)"
        : "transparent"
});

const mapStateToProps = store => ({
    data: filteredDataSelector(store),
    filters: store.filters
})

const mapDispatchToProps = (dispatch) => ({
    reorderItems: (reorderedData) => dispatch(reorderItems(reorderedData))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataList)