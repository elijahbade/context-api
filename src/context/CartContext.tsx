import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ICartItem } from '../interfaces/types';

interface CartContextProps {
    items: ICartItem[];
    totalAmount: number;
    calculateTotal: () => number;
    addItem: (item: ICartItem) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, count: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<ICartItem[]>([]);

    // 1. Calculate total price of items in the cart
    const calculateTotal = () => {
        return items.reduce((sum, item) => sum + item.price * item.count, 0);
    };

    // 2. Add a new item or update the quantity if the item already exists
    const addItem = (item: ICartItem) => {
        setItems((prevItems) => {
            const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
            if (existingItemIndex >= 0) {
                const updatedItems = [...prevItems];
                updatedItems[existingItemIndex].count += item.count;
                return updatedItems;
            } else {
                return [...prevItems, item];
            }
        });
    };

    // 3. Remove an item from the cart by its ID
    const removeItem = (id: number) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    // 4. Update the quantity of an item by ID
    const updateQuantity = (id: number, quantity: number) => {
        setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, count: quantity } : item
            )
        );
    };

    // 5. Clear all items from the cart
    const clearCart = () => {
        setItems([]);
    };

    // Calculate total amount whenever items change
    const totalAmount = calculateTotal();

    return (
        <CartContext.Provider
            value={{
                items,
                totalAmount,
                calculateTotal,
                addItem,
                removeItem,
                updateQuantity,
                clearCart,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

// Custom hook for using the CartContext
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
