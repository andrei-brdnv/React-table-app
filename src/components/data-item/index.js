import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {deleteDataItem, editDataItem} from "../../redux/actions";
import ColorPicker from "../color-picker";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

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
        const {dataItem} = this.props
        return (
            <div className="flex-container">
                <div className="flex-item flex-item__rendered">{dataItem.name}</div>
                <div className="flex-item flex-item__rendered">{dataItem.type}</div>
                <div className="flex-item">
                    {/*<CopyToClipboard text={this.hexToRgb(dataItem.color)}>
                        <div onClick={this.hexToRgb(dataItem.color)}>Click: {this.hexToRgb(dataItem.color)}</div>
                    </CopyToClipboard>*/}
                    <CopyToClipboard text={dataItem.color}>
                        <div className="flex-item flex-item__color" style={{background: dataItem.color}}></div>
                    </CopyToClipboard>
                </div>
                <div className="flex-item">
                    <span>
                        <FontAwesomeIcon className="faicons icon-edit" onClick={this.handleEdit} icon="edit" />
                    </span>
                    <span>
                        <FontAwesomeIcon className="faicons icon-delete" onClick={this.handleDelete} icon="trash-alt" />
                    </span>
                </div>
            </div>
        );
    }

    hexToRgb = (hex) => {
        return ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
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
                        className="input"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        placeholder="name..."
                        autofocus="true"
                    />
                </div>
                <div className="flex-item">
                    <input
                        className="input"
                        value={this.state.type}
                        onChange={this.handleChange('type')}
                        placeholder="type..."
                    />
                </div>
                <div className="flex-item flex-item__color">
                    <ColorPicker
                        color={this.state.color}
                        onColorChange={this.handleColorChange}
                    />
                </div>
                <div className="flex-item">
                    <button
                        className="btn btn-confirm"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        )
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const {dataItem} = this.props
        this.setState({isEditing: !this.state.isEditing})
        this.props.editDataItem(dataItem.id, this.state)
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