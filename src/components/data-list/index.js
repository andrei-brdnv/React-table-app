import React, {Component} from "react";
import {connect} from "react-redux";
import DataItem from "../data-item";
import {filteredDataSelector} from "../../selectors";

class DataList extends Component {
    render() {
        console.log('render data list')
        const {data} = this.props
        // console.log(data)
        const dataList = data.map((dataItem) =>
            <div key={dataItem.id}>
                <DataItem
                    dataItem={dataItem}
                />
            </div>
        )

        return (
            <div className="list-container">
                {dataList}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    data: filteredDataSelector(store)
})

export default connect(mapStateToProps)(DataList)