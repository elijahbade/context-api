import React from 'react';
import Login from './components/Login';
import Logout from './components/Logout';
import UserStatus from './components/userStaus';
import ShoppingCart from './components/ShoppingCart';

const App: React.FC = () => {
    return (
        <div>
            <UserStatus />
            <Login />
            <Logout />
            <ShoppingCart/>
        </div>
    );
};

export default App;