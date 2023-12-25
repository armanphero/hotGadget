import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import ErrorPage from './components/ErrorPage';
import About from './components/About';
import Home from './components/Home';
import Shop from './components/Shop';
import Cart from './components/Cart';
import { getCartProducts } from './utilities/fakeDb';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        loader: () => getCartProducts(),
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/shop',
                element: <Shop />
            },
            {
                path: '/cart',
                element: <Cart />
            },
            {
                path: '/about',
                element: <About />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}></RouterProvider>
)
