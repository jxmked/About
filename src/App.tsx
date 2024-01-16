import React from "react";
import PageView from "./hooks/ga";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BgCanvas from "./components/bg-canvas";

function App() {
  PageView();

  const { innerWidth, innerHeight } = window;

  return (
    <>
      {/* <canvas width={innerWidth} height={innerHeight} className=' fixed block w-full h-full p-0 m-0 top-0 left-0 translate-x-0.5 translate-y-0.5'></canvas> */}
      <BgCanvas />
      <div>Hello, world</div>
    </>
  );
}

export default App;
