import './App.css';
import HomeComponent from './pages/HomePage';
import HeaderComponent from './components/header';
import FooterComponent from './components/footer';
import ProductDetails from './pages/singleproductpage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CartPage from './pages/CartPage';

function App() {

    const [CartItems,setCartItems] = useState([]);

    return (
        <div className="App">
            <Router>
                <div>
                    <ToastContainer theme="dark" position="top-center"/>
                    <HeaderComponent CartItems={CartItems} />
                    <Routes>
                        <Route path='/' element={<HomeComponent />} />
                        <Route path='/cart' element={<CartPage CartItems={CartItems} setCartItems={setCartItems} />} />
                        <Route path='/search' element={<HomeComponent />} />
                        <Route path='/products/:id' element={<ProductDetails CartItems={CartItems} setCartItems={setCartItems}/>} />
                    </Routes>
                    <FooterComponent />
                </div>
            </Router>
        </div>
    );
}

export default App;