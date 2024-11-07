import React from 'react';
import { useAuth } from '../context/Authcontext';

const UserStatus: React.FC = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div>
            {isAuthenticated ? (
                <h2>Welcome, {user?.username}!</h2>
            ) : (
                <h2>Please log in.</h2>
            )}
        </div>
    );
};

export default UserStatus;