import React, {Component} from "react";
import {connect} from "react-redux";
import dataReducer from "../../redux/reducers/dataReducer";
import DataItem from "../data-item";

class DataList extends Component {
    render() {
        const {data} = this.props
        // console.log(data)
        const dataList = data.map(dataItem =>
            <div key={dataItem.id}>
                <DataItem
                    dataItem={dataItem}
                />
            </div>
        )

        return (
            <div>
                {dataList}
            </div>
        );
    }
}

const mapStateToProps = store => ({
    data: store.data
})

export default connect(mapStateToProps)(DataList)