import React, {Component} from "react";
import {connect} from "react-redux";
import {addDataItem} from "../../redux/actions";
import ColorPicker from "../color-picker";

class DataForm extends Component {
    state = {
        name: '',
        type: '',
        color: '#ae8f87'
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="flex-container">
                <div className="flex-item">
                    <input
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        placeholder="name..."
                    />
                </div>
                <div className="flex-item">
                    <input
                        value={this.state.type}
                        onChange={this.handleChange('type')}
                        placeholder="type..."
                    />
                </div>
                <div className="flex-item">
                    <ColorPicker
                        color={this.state.color}
                        onColorChange={this.handleColorChange}
                    />
                </div>
                <div className="flex-item">
                    <button
                        className=""
                    >
                        Add
                    </button>
                </div>
            </form>
        )
    }

    handleColorChange = (color) => {
        this.setState({color: color.hex})
    };

    handleSubmit = (event) => {
        event.preventDefault()
        this.props.addDataItem(this.state)
        this.setState({
            name: '',
            type: ''
        })
    }

    handleChange = (type) => (event) => {
        const {value} = event.target
        this.setState({
            [type]: value
        })
    }
}

/*
const mapDispatchToProps = dispatch => ({
    addDataItem: (dataItem) => dispatch(addDataItem(dataItem))
})
*/

export default connect(
    null,
    (dispatch) => ({
        addDataItem: (dataItem) => dispatch(addDataItem(dataItem))
    })
)(DataForm)