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
        ? "#fff59d"
        : "transparent",
    ...draggableStyle
    /*"linear-gradient(to left, transparent, #fff59d 10%, #fff59d 90%, transparent 100%)"*/
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver
        ? "#bdbdbd"
        : "transparent"
    /*"linear-gradient(to left, transparent, #bdbdbd 10%, #bdbdbd 90%, transparent 100%)"*/
});

const mapStateToProps = store => ({
    data: filteredDataSelector(store),
    filters: store.filters
})

const mapDispatchToProps = (dispatch) => ({
    reorderItems: (reorderedData) => dispatch(reorderItems(reorderedData))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataList)