import React from 'react';
import PageView from './hooks/ga';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BgCanvas from './components/bg-canvas';

function App() {
  PageView();

  // const { innerWidth, innerHeight } = window;

  return (
    <>
      <div
        className='z-10 blur-sm fixed w-full h-full block top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-900'>
        <BgCanvas />
      </div>
    </>
  );
}

export default App;
