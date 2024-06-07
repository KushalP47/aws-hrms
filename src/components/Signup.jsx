import React, { useState } from 'react';
import { userPool } from '../aws/UserPool.js';

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        userPool.signUp(email, password, [], null, (err, data) => {
            if (err) console.error(err);
            console.log(data);
        });
    }

    return (
        <div>
            <form onSubmit={onSubmit} className='bg-white text-black'>
                <label htmlFor="email">Email</label>
                <input type="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)}>
                </input>
                <label htmlFor="password">Password</label>
                <input type="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)}>
                </input>
                <button type="submit" className='bg-yellow text-black'>Signup</button>
            </form>
        </div>
    );
}

export default Signup;