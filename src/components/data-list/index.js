import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import DataItem from "../data-item";
import {filteredDataSelector} from "../../selectors";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {reorder} from "../../utils";
import {reorderItems} from "../../redux/actions";

class DataList extends Component {
    onDragEnd = result => {
        if (!result.destination) {
            return;
        }

        const reorderedData = reorder(
            this.props.data,
            result.source.index,
            result.destination.index
        );

        this.props.reorderItems(reorderedData)
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
        ? "linear-gradient(to left, transparent, #ffca28 20%, #ffca28 80%, transparent 100%)"
        : "transparent",
    ...draggableStyle
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver
        ? "linear-gradient(to left, transparent, #c5cae9 20%, #c5cae9 80%, transparent 100%)"
        : "transparent"
});

const mapStateToProps = store => ({
    data: filteredDataSelector(store)
})

const mapDispatchToProps = (dispatch) => ({
    reorderItems: (reorderedData) => dispatch(reorderItems(reorderedData))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataList)