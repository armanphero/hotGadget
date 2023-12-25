import React, { useContext } from 'react'
import { addToDb } from '../../utilities/fakeDb';
import { CartContext } from '../../App';

const ProductCard = ({ product }) => {
  const { name, picture, price, category, id } = product;
  const [productsInDb, setProductsInDb] = useContext(CartContext);

  const handleAddToDb = () => {
    addToDb(id);
    const existingProduct = productsInDb.find(pd => pd.id === id);
    if(existingProduct){
      const newQuantity = existingProduct.quantity + 1;
      existingProduct.quantity = newQuantity;
      const newCartProducts = [...productsInDb];
      setProductsInDb(newCartProducts);
    }
    else{
      product.quantity = 1;
      setProductsInDb([...productsInDb, product])
    }
    // productsInDb.map(pd => {
    //   if (pd.id === id) {

    //     const previousQuantity = pd.quantity;
    //     pd.quantity = previousQuantity + 1;
    //     setProductsInDb(productsInDb);
    //     return;
    //   }
    //   else {
    //     product.quantity = 1;
    //     setProductsInDb([...productsInDb, product]);
    //     return;
    //   }
    // });
  }

  // console.log(product);
  return (
    <div className='bg-gray-100 p-6 rounded shadow-lg'>
      <img
        className='object-cover w-full h-56 mb-6 rounded shadow-lg md:h-64 xl:h-80'
        src={picture}
        alt=''
      />
      <p className='mb-2 text-xl font-bold leading-none sm:text-2xl'>{name}</p>
      <p className='text-gray-700 '>Category: {category}</p>
      <p className='text-gray-700 font-bold'>Price: {price}$</p>
      <button
        onClick={handleAddToDb}
        type='button'
        className='btn-primary w-full block'
      >
        Add To Cart
      </button>
    </div>
  )
}

export default ProductCard
