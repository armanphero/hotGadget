import { data } from "autoprefixer";
import toast from "react-hot-toast";

const addToDb = (id) => {
    const shoppingCart = getPreviousCart();
    if (id in shoppingCart) {
        const previousQuantity = shoppingCart[id];
        shoppingCart[id] = previousQuantity + 1;
    }
    else {
        shoppingCart[id] = 1;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    toast.success('Product Added! 🛒');
}


const getPreviousCart = () => {
    let shoppingCart = {};
    const previousShoppingCart = localStorage.getItem('shopping-cart');
    if (previousShoppingCart) {
        const newShoppingCart = JSON.parse(previousShoppingCart);
        shoppingCart = newShoppingCart;
    }
    return shoppingCart;
}


const removeProductFromDb = (id) => {
    const shoppingCart = getPreviousCart();
    delete shoppingCart[id];
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}


const getCartProducts = async () => {
    const response = await fetch('products.json');
    const products = await response.json();
    const shoppingCart = getPreviousCart();
    const cartProducts = [];
    for (const id in shoppingCart) {
        const singleProduct = products.find(product => product.id === id);
        if (singleProduct) {
            singleProduct.quantity = shoppingCart[id];
            cartProducts.push(singleProduct);
        }
    }

    return [cartProducts, products];
}


export { addToDb, getPreviousCart, getCartProducts, removeProductFromDb };