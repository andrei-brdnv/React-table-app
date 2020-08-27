import React, {Component} from "react";
import {connect} from "react-redux";
import {deleteDataItem} from "../../redux/actions";

class DataItem extends Component {
    render() {
        const {dataItem} = this.props
        return (
            <div className="flex-container">
                <div className="flex-item">{dataItem.name}</div>
                <div className="flex-item">{dataItem.type}</div>
                <div className="flex-item">{dataItem.color}</div>
                <div className="flex-item">
                    <button onClick={this.handleDelete}>delete</button>
                </div>
            </div>
        );
    }

    handleDelete = () => {
        this.props.deleteDataItem(this.props.dataItem.id)
    }
}

export default connect(
    null,
    (dispatch) => ({
        deleteDataItem: (id) => dispatch(deleteDataItem(id))
    })
)(DataItem)