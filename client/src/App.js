import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormComponent from './components/FormComponent';
import DisplayDataComponent from './components/Display';
import Homescreen from './components/Homescreen';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Homescreen />} />
                <Route path="/submit" element={<FormComponent />} />
                <Route path="/display" element={<DisplayDataComponent />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
