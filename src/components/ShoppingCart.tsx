// components/ShoppingCart.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ShoppingCart: React.FC = () => {
    const { items, totalAmount, addItem, removeItem, updateQuantity, clearCart } = useCart();
    
    // Local state to hold new item input values
    const [newProductName, setNewProductName] = useState('');
    const [newPrice, setNewPrice] = useState<number | ''>('');
    const [newQuantity, setNewQuantity] = useState<number>(1);

    const handleAddItem = () => {
        if (newProductName && newPrice && newQuantity > 0) {
            addItem({
                id: Date.now(),
                productName: newProductName,
                price: newPrice,
                count: newQuantity,
            });
            // Clear the input fields after adding
            setNewProductName('');
            setNewPrice('');
            setNewQuantity(1);
        }
    };

    return (
        <div>
            <h2>Shopping Cart</h2>
            
            {/* Form to add new items */}
            <div>
                <input
                    type="text"
                    placeholder="Product Name"
                    value={newProductName}
                    onChange={(e) => setNewProductName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                />
                <input
                    type="number"
                    placeholder="Quantity"
                    min="1"
                    value={newQuantity}
                    onChange={(e) => setNewQuantity(Number(e.target.value))}
                />
                <button onClick={handleAddItem}>Add Item</button>
            </div>

            {/* Display list of items in the cart */}
            <ul>
                {items.map(item => (
                    <li key={item.id}>
                        {item.productName} - ${item.price} x {item.count}
                        <button onClick={() => removeItem(item.id)}>Remove</button>
                        <button onClick={() => updateQuantity(item.id, item.count + 1)}>+</button>
                        <button onClick={() => updateQuantity(item.id, item.count - 1)}>-</button>
                    </li>
                ))}
            </ul>

            {/* Cart total and clear button */}
            <div>Total: ${totalAmount.toFixed(2)}</div>
            <button onClick={clearCart}>Clear Cart</button>
        </div>
    );
};

export default ShoppingCart;
