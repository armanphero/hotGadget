import React, { useContext, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import CartItem from './Cards/CartItem';
import toast from 'react-hot-toast';
import { CartContext } from '../App';
import { getCartProducts } from '../utilities/fakeDb';

const Cart = () => {
    const [cartProducts, setProductsInDb] = useContext(CartContext);
    // console.log(cartProducts);
    let total = 0;
    const getTotal = () => {
        cartProducts.forEach(product => {
            total = total + (product.quantity * product.price);
        })
    }
    getTotal();

    const clearCart = () => {
        setProductsInDb([]);
        localStorage.removeItem('shopping-cart');
    }

    const handleClearCart = () => {
        clearCart();
        toast.error('All Items Removed! 🔥');
    }

    const placeOrder = () => {
        clearCart();
        toast.success('Order Placed! 👍');
    }

    return (
        <div className='my-container'>
            <div className='md:max-w-lg lg:max-w-xl mx-auto'>
                <h1 className='font-semibold text-xl'>{cartProducts.length ? 'Review Cart Items' : 'Cart is EMPTY!'}</h1>
                <ul className='divide-y divide-gray-700'>
                    {
                        cartProducts.map(product => <CartItem product={product} key={product.id} />)
                    }
                </ul>
                <div className='flex flex-col items-end mb-5'>
                    <p>Total amount: <span className='font-bold'>{total}$</span></p>
                    <p className='text-gray-400'>Not including taxes and shipping costs</p>
                </div>
                {
                    cartProducts.length > 0 &&
                    <div className='flex justify-end'>
                        <button className='btn-outlined' onClick={handleClearCart}>Clear Cart</button>
                        <button className='btn-primary' onClick={placeOrder}>Place Order</button>
                    </div>
                }
                {
                    cartProducts.length === 0 &&
                    <div className='flex justify-end'>
                        <Link to='/shop'>
                            <button className='btn-outlined'>Back To Shop</button>
                        </Link>
                        <button className='btn-primary' onClick={() => toast.error('Cart is empty! 🔥')}>Place Order</button>
                    </div>
                }
            </div>
        </div>
    );
};

export default Cart;