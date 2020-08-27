import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {deleteDataItem, editDataItem} from "../../redux/actions";
import ColorPicker from "../color-picker";

class DataItem extends Component {
    state = {
        name: '',
        type: '',
        color: '',
        isEditing: false
    }

    mapDataToState = () => {
        const {dataItem} = this.props
        this.setState({
            name: dataItem.name ? dataItem.name : '',
            type: dataItem.type ? dataItem.type : '',
            color: dataItem.color ? dataItem.color : '',
        })
    }

    render() {

        const {isEditing} = this.state
        return (
            <Fragment>
                {isEditing ? this.renderForm() : this.renderItem()}
            </Fragment>
        )
    }

    renderItem() {
        console.log('render data item basic')
        const {dataItem, i} = this.props
        return (
            <div className="flex-container">
                <div className="flex-item">{i + 1}</div>
                <div className="flex-item">{dataItem.name}</div>
                <div className="flex-item">{dataItem.type}</div>
                <div className="flex-item">{dataItem.color}</div>
                <div className="flex-item">
                    <button onClick={this.handleEdit}>edit</button>
                    <button onClick={this.handleDelete}>delete</button>
                </div>
            </div>
        );
    }

    handleEdit = () => {
        this.setState({isEditing: !this.state.isEditing})
        this.mapDataToState()
    }

    handleDelete = () => {
        this.props.deleteDataItem(this.props.dataItem.id)
    }

    renderForm() {
        console.log('render data item form')
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
                        Confirm
                    </button>
                </div>
            </form>
        )
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {dataItem, i} = this.props
        this.setState({isEditing: !this.state.isEditing})
        this.props.editDataItem(i, dataItem.id, this.state)
    }

    handleChange = (type) => (event) => {
        const {value} = event.target
        this.setState({
            [type]: value
        })
    }

    handleColorChange = (color) => {
        this.setState({color: color.hex})
    }
}

export default connect(
    null,
    (dispatch) => ({
        deleteDataItem: (id) => dispatch(deleteDataItem(id)),
        editDataItem: (id, editedValue) => dispatch(editDataItem(id, editedValue))
    })
)(DataItem)