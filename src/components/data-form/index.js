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
        console.log('render DataForm')
        return (
            <form onSubmit={this.handleSubmit} className="flex-container__form">
                <div className="flex-item__one">
                    <input
                        className={this.getClassName('name')}
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        placeholder="name..."
                    />
                </div>
                <div className="flex-item__two">
                    <input
                        className={this.getClassName('type')}
                        value={this.state.type}
                        onChange={this.handleChange('type')}
                        placeholder="type..."
                    />
                </div>
                <div className="flex-item__three">
                    <ColorPicker
                        color={this.state.color}
                        onColorChange={this.handleColorChange}
                    />
                </div>
                <div className="flex-item__four">
                    <button
                        className="btn btn-add"
                        disabled={!this.isValidForm()}
                    >
                        Add
                    </button>
                </div>
            </form>
        )
    }

    isValidForm = () => ['name', 'type'].every(this.isValidField)

    isValidField = (type) => this.state[type].length >= limits[type].min

    getClassName = (type) => (this.isValidField(type) ? 'input' : 'input__error')

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
        if (value.length > limits[type].max) return
        this.setState({
            [type]: value
        })
    }

    handleColorChange = (color) => {
        this.setState({color: color.hex})
    }
}

const limits = {
    name: {
        min: 3,
        max: 30
    },
    type: {
        min: 3,
        max: 30
    }
}

export default connect(
    null,
    (dispatch) => ({
        addDataItem: (dataItem) => dispatch(addDataItem(dataItem))
    })
)(DataForm)