import React, {Component} from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {changeSelection} from "../../redux/actions";

const customStyles = {
    control: (provided, state) => ({
        ...provided,
        borderRadius: '0',
    })
}

class SelectFilter extends Component {
    render() {
        console.log('render SelectFilter')
        return (
            <div className="select">
                <Select
                    styles={customStyles}
                    options={this.options()}
                    value={this.props.selectedOptions}
                    onChange={this.handleSelectChange}
                    isMulti
                />
            </div>
        );
    }

    options = () => {
        return this.props.data.map(dataItem => ({
            value: dataItem.id,
            label: dataItem.name
        }))
    }

    handleSelectChange = (selectedOption) => {
        if (selectedOption === null) {
            selectedOption = [];
        }

        this.props.changeSelection(selectedOption)
    }
}

const mapStateToProps = store => ({
    data: store.data,
    selectedOptions: store.filters.selected
})

const mapDispatchToProps = {
    changeSelection
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectFilter)