import React, {Component} from "react";
import {connect} from "react-redux";
import Select from "react-select";
import {changeSelection} from "../../redux/actions";

const customStyles = {
    container: (provided, state) => ({
        ...provided,
    }),
    control: (provided, state) => ({
        ...provided,
        /*margin: '0 auto',*/
        borderRadius: '0',
        flexWrap: 'nowrap'
    })
}

class SelectFilter extends Component {
    render() {
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