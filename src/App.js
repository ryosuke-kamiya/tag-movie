import React from 'react';
import { Routes } from './route.js';
import { ModalProvider } from './contexts';

function App() {

 return(
   <ModalProvider>
    <Routes />
   </ModalProvider>
 )

}

export default App;
