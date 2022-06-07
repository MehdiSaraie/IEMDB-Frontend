import React from "react";
import ReactDOM from 'react-dom';

import "./src/assets/css/reset.css";
import "./src/assets/css/shared.css";
import App from "./src/app/App"

export const apiUrl = "http://localhost:8080/iemdb_war/";

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);