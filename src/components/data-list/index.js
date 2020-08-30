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
        console.log('render data list')
        const {data} = this.props
        console.log(this.props.data)
        // console.log(data)
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
    background: isDragging ? "linear-gradient(to left, transparent, #4db6ac 15%, #4db6ac 85%, transparent 100%)" : "transparent",
    ...draggableStyle
    /*linear-gradient(to right, transparent, transparent 2%, #d7f0a2 2%, #d7f0a2 98%, transparent 98%)*/
});

const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "linear-gradient(to left, transparent, #dce775 15%, #dce775 85%, transparent 100%)" : "transparent"
});

const mapStateToProps = store => ({
    data: filteredDataSelector(store)
})

const mapDispatchToProps = (dispatch) => ({
    reorderItems: (reorderedData) => dispatch(reorderItems(reorderedData))
})

export default connect(mapStateToProps, mapDispatchToProps)(DataList)