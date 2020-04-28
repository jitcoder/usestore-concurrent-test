import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

document.title = "concurrent";

// concurrent mode
const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(<App />);

// sync mode
// ReactDOM.render(<App />, document.getElementById('app'));
