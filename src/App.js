import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Product from './components/product/'

function App() {
  return (
    <>
      <Router>
        <Routes>
            <Route path="/" element={<Product/>}>           
            </Route>
        </Routes>
    </Router>
    </>
  )
}

export default App;