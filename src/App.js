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
            <div className="container">
                <SelectFilter />
                <DataForm />
                <hr className="hr"/>
                <DataList />
            </div>
        )
    }
}

export default App
