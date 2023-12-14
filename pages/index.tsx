import React, {useState} from 'react';
import {MainPage} from '../src/components/MainPage'
import Cursor from "../src/components/Cursor";

//TailwindCSS
//ThreeJS/R3F
//ReactRouter
//Axios 

function App() : JSX.Element{
  
  return (
    <> 
      <div className="absolute dark:bg-black w-screen h-screen duration-500 overflow-hidden">
        <MainPage/>
        <Cursor />
      </div>
    </>
  );
}

export default App;