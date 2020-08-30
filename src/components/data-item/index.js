import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {deleteDataItem, editDataItem} from "../../redux/actions";
import ColorPicker from "../color-picker";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

class DataItem extends Component {
    state = {
        name: '',
        type: '',
        color: '',
        colorRgb: '',
        isEditing: false,
        copied: false
    }

    mapDataToState = () => {
        const {dataItem} = this.props
        this.setState({
            name: dataItem.name ? dataItem.name : '',
            type: dataItem.type ? dataItem.type : '',
            color: dataItem.color ? dataItem.color : '',
            colorRgb: dataItem.colorRgb ? dataItem.colorRgb : ''
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
            <div className="flex-container__form">
                <div className="flex-item__one">
                    <p>{dataItem.name}</p>
                </div>
                <div className="flex-item__two">
                    <p>{dataItem.type}</p>
                </div>
                <div className="flex-item__three" style={{background: dataItem.color}}>
                    <CopyToClipboard text={dataItem.color} onCopy={() => this.setState({copied: true})}>
                        <div className="copy-hex-value">
                            {this.state.copied ? <span>Copied</span> : <span>Copy hex value to clipboard</span>}
                        </div>
                    </CopyToClipboard>
                    <CopyToClipboard text={dataItem.colorRgb} onCopy={() => this.setState({copied: true})}>
                        <div className="copy-rgb-value">
                            {this.state.copied ? <span>Copied</span> : <span>Copy rgb value to clipboard</span>}
                        </div>
                    </CopyToClipboard>
                </div>
                <div className="flex-item__four">
                    <div className="faicon">
                        <FontAwesomeIcon className="icon-edit" onClick={this.handleEdit} icon="edit"/>
                        <FontAwesomeIcon className="icon-delete" onClick={this.handleDelete} icon="trash-alt"/>
                    </div>
                </div>
            </div>
        );
    }

    hexToRgb = (hex) => {
        console.log('hexToRgb')
        const rgb = ['0x' + hex[1] + hex[2] | 0, '0x' + hex[3] + hex[4] | 0, '0x' + hex[5] + hex[6] | 0];
    }

    handleEdit = () => {
        console.log('handle edit')
        this.setState({isEditing: !this.state.isEditing})
        this.mapDataToState()
    }

    handleDelete = () => {
        this.props.deleteDataItem(this.props.dataItem.id)
    }

    renderForm() {
        console.log('render data item form')
        return (
            <form onSubmit={this.handleSubmit} className="flex-container__form">
                <div className="flex-item__one">
                    <input
                        className="input"
                        value={this.state.name}
                        onChange={this.handleChange('name')}
                        placeholder="name..."
                        autoFocus={true}
                    />
                </div>
                <div className="flex-item__two">
                    <input
                        className="input"
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