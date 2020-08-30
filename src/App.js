import React, {Component} from 'react';
import './App.css';
import DataList from "./components/data-list";
import DataForm from "./components/data-form";
import SelectFilter from "./components/select-filter";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faTrashAlt, faEdit } from "@fortawesome/free-solid-svg-icons";

library.add(faTrashAlt, faEdit)

class App extends Component {
    render() {
        return (
            <div className="flex-container">
                <h1 className="h1">React-table-app</h1>
                <SelectFilter/>
                <DataForm/>
                <hr className="hr hr__form"/>
                <DataList/>
            </div>
        )
    }
}

export default App
