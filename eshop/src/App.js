import React, { useState, useEffect} from "react";

import {commerce} from "./lib/commerce";
import {Products, Navbar, Cart, Checkout} from "./components";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = function() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});

    const fetchProducts = async function() {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async function() {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async function(productId, quantity) {
        const item = await commerce.cart.add(productId, quantity);
        setCart(item);
    }

    const handleUpdateCartQuantity = async function(productId, quantity) {
        const item = await commerce.cart.update(productId, {quantity});
        setCart(item);
    }

    const handleRemoveFromCart = async function(productId) {
        const item = await commerce.cart.remove(productId);
        setCart(item);
    }

    const handleEmptyCart = async function() {
        const cart = await commerce.cart.empty();
        setCart(cart);
    }

    useEffect(function() {
        fetchProducts();
        fetchCart();
    }, []);

    return (
        <Router>
            <Navbar totalItems={cart.total_items} />
            <Routes>
                <Route exact path="/" element={
                    <Products products={products} onAddToCart={handleAddToCart} />
                } />
                <Route exact path="/cart" element={
                    <Cart cart={cart} onUpdate={handleUpdateCartQuantity} onRemove={handleRemoveFromCart} onEmpty={handleEmptyCart} />
                } />
                <Route exact path="/checkout" element={
                    <Checkout cart={cart} />
                } />
            </Routes>
        </Router>
    )
}

export default App