import React, { createContext, useContext, useState } from 'react'

import type { Product } from '../interfaces/Product'

export interface CartItem extends Product {
    quantity: number
}

interface CartContextType { // this is the data context provider will be globally allow access to for all components
    items: CartItem[],
    addToCart: (product: Product) => void,
    removeFromCart: (productID: number) => void,
    clearItemFromCart: (productID: number) => void,
    clearCart: () => void
}

const cartContext = createContext<CartContextType | null>(null);

export const useCartContext = () => {
    const context = useContext(cartContext);

    if (!context) throw new Error("useCartContext must be used within CartContextProvider");

    return context;
}

// interface CartContextProviderProps { children : React.ReactNode } // Any component returns a tsx, which is a React Node

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addToCart = (product: Product) => {
        setItems(currentItems => {
            const itemExistsInCart = currentItems.find(item => item.id === product.id);

            if (itemExistsInCart) return currentItems.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);

            return [...currentItems, { ...product, quantity: 1 }];
        });
    }

    const removeFromCart = (productID: number) => {
        setItems(currentItems =>
            currentItems
                .map(item =>
                    item.id === productID
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                )
                .filter(item =>
                    item.quantity > 0)
        );
    }

    const clearItemFromCart = (productID: number) => {
        setItems(currentItems =>
            currentItems
                .filter(item => item.id !== productID)
        );
    }

    const clearCart = () => {
        setItems([]);
    }

    return (
        <cartContext.Provider value={{ items, addToCart, removeFromCart, clearItemFromCart, clearCart }}>
            {children}
        </cartContext.Provider>
    );
}