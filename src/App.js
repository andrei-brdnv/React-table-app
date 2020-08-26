import React, { Component } from 'react';
import './App.css';
import DataList from "./components/data-list";

class App extends Component {
    render() {
        return (
            <div className="container">
                <DataList />
            </div>
        )
    }
}

export default App
