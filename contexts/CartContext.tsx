import React, { createContext, useContext, useState } from 'react'

import type { Product } from '../interfaces/Product'

interface CartItem extends Product {
    quantity: number
}

interface CartContextType { // this is what the context provider will be returning
    items: CartItem[]
    addToCart: (product: Product) => void
    removeFromCart: (productID: number) => void
}

const cartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
    return useContext(cartContext);
}

/*
interface CartContextProviderProps {
    children : React.ReactNode
} // Any component returns a tsx, which is a React Node
*/

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setItems(currentItems => {
            const itemExistsInCart = currentItems.find(item => item.id === product.id);

            if (itemExistsInCart) return currentItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);

            return [...currentItems, { ...product, quantity: 1 }];
        })
    }

    const removeFromCart = (productID: number) => {
        setItems(currentItems =>
            currentItems.map(item =>
                item.id === productID ? { ...item, quantity: item.quantity - 1 } : item
            ).filter(item => item.quantity > 0)
        )
    }

    return (
        <cartContext.Provider value={{ items, addToCart, removeFromCart }}>
            {children}
        </cartContext.Provider>
    );
}