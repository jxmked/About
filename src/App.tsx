import React from 'react';
import PageView from "./hooks/ga"
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  PageView();
  
  return (
    <div>Hello, world</div>
  );
}

export default App;
