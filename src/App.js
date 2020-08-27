import React, {Component} from 'react';
import './App.css';
import DataList from "./components/data-list";
import DataForm from "./components/data-form";

class App extends Component {
    render() {
        return (
            <div className="container">
                <DataForm />
                <hr/>
                <DataList />
            </div>
        )
    }
}

export default App
