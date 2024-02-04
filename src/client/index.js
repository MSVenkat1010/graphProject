import React from "react";

import App from "./App"
/* import ReactDOM from "react-dom";
ReactDOM.render(<App/>,document.getElementById('root')); React 18 is no longer supporting this */
import { createRoot } from 'react-dom/client'
createRoot(document.getElementById('root')).render(<App/>)