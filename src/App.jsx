import { Outlet, useLoaderData } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Toaster } from 'react-hot-toast';
import { createContext, useState } from 'react';
import MyModal from "./components/Modal";

export const ProductsContext = createContext([]);
export const CartContext = createContext([]);

const App = () => {
  const [cartProducts, products] = useLoaderData();
  const [productsInDb, setProductsInDb] = useState(cartProducts);

  // console.log(products);
  // console.log(productsInDb);
  return (
    <>
      <ProductsContext.Provider value={products}>
        <CartContext.Provider value={[productsInDb, setProductsInDb]}>
          <Header />
          <div className="min-h-[calc(100vh-157px)]">
            <Outlet />
          </div>
          <Footer />
          <Toaster />
          <MyModal />
        </CartContext.Provider>
      </ProductsContext.Provider>
    </>
  )
}

export default App
