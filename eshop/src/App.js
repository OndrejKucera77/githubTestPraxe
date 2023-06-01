import React, { useState, useEffect} from "react";

import {commerce} from "./lib/commerce";
import {Products, Navbar, Cart, Checkout} from "./components";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = function() {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});
    const [order, setOrder] = useState({});
    const [errorMessage, setErrorMessage] = useState("");

    const fetchProducts = async function() {
        const {data} = await commerce.products.list();
        setProducts(data);
    }

    const fetchCart = async function() {
        setCart(await commerce.cart.retrieve());
    }

    const handleAddToCart = async function(productId, quantity) {
        const cart = await commerce.cart.add(productId, quantity);
        setCart(cart);
    }

    const handleUpdateCartQuantity = async function(productId, quantity) {
        const cart = await commerce.cart.update(productId, {quantity});
        setCart(cart);
    }

    const handleRemoveFromCart = async function(productId) {
        const cart = await commerce.cart.remove(productId);
        setCart(cart);
    }

    const handleEmptyCart = async function() {
        const cart = await commerce.cart.empty();
        setCart(cart);
    }

    const refreshCart = async function() {
        const newCart = await commerce.cart.refresh();
        setCart(newCart);
    }
    
    const handleCaptureCheckout = async function(checkoutTokenId, newOrder) {
        try {
            const incomingOrder = await commerce.checkout.capture(checkoutTokenId, newOrder);
            setOrder(incomingOrder);
            refreshCart();
        }
        catch (error) {
            setErrorMessage(error.data.error.message || error);
        }
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
                    <Checkout cart={cart} order={order} onCaptureCheckout={handleCaptureCheckout} error={errorMessage} />
                } />
            </Routes>
        </Router>
    )
}

export default App