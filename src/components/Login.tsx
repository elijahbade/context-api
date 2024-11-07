import React, { useState } from 'react';
import { useAuth } from '../context/Authcontext';

const Login: React.FC = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState<string>('');

    const handleLogin = () => {
        const userData = { username }; // Simulated user data
        login(userData);
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
};

export default Login;