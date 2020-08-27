import React, {Component} from 'react';
import './App.css';
import DataList from "./components/data-list";
import DataForm from "./components/data-form";
import SelectFilter from "./components/select-filter";

class App extends Component {
    render() {
        return (
            <div className="container">
                <DataForm />
                <hr/>
                <SelectFilter />
                <hr/>
                <DataList />
            </div>
        )
    }
}

export default App
