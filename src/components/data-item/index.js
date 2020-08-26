import React, { Component } from "react";

class DataItem extends Component {
    render() {
        const { dataItem } = this.props
        return (
            <div className="flex-container">
                <div className="flex-item">{dataItem.name}</div>
                <div className="flex-item">{dataItem.type}</div>
                <div className="flex-item">{dataItem.color}</div>
            </div>
        );
    }
}

export default DataItem