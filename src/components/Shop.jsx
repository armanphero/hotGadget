import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import ProductCard from './Cards/ProductCard';
import { ProductsContext } from '../App';

const Shop = () => {
    const products = useContext(ProductsContext);
    // console.log(products);
    return (
        <div className='my-container'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                {
                    products.map(product => <ProductCard product={product} key={product.id}></ProductCard>)
                }
            </div>
        </div>
    );
};

export default Shop;