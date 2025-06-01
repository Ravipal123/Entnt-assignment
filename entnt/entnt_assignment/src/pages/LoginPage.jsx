import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handlelogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const res = await login(email, password);
        setLoading(false);
        if (res.success) {
            navigate("/dashboard");
        } else {
            setError(res.message);
        }
    };

    return (
        <>
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-10 md:gap-28 px-4 py-8 bg-center">
                <h1 className='text-center text-4xl md:text-5xl lg:text-6xl font-bold text black select-none'>SHIPS MAINTENANCE</h1>
                <form
                    className='w-full wax-w-md bg-white/10 border-white/10 backdrop-blur-2xl rounded-2xl p-6 text-black flex-col shadow-2xl'
                    onSubmit={handlelogin}
                >
                    {error && <p className="text-red-400 text-center text-sm mb-2">{error}</p>}
                    <label htmlFor="email" className='mt-2 text-lg font-bold select-none'>Email</label>
                    <input 
                        id='email'
                        type="email" 
                        className='w-full mt-2 mb-4 px-4 py-3 text-sm font-light bg-gray border rounded placeholder:text-[#e5e5e5] hover:bg-[#929191] focus:bg-[#d2d0d0] focus:shadow-[0px_2px_2px_#0002,0px_5px_10px_#0006] outline-none transition-all duration-500'
                        placeholder='Enter your email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password" className='mt-2 text-lg font-bold select-none'>Password</label>
                    <input 
                        id='password'
                        type="password" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className='w-full mt-2 mb-4 px-4 py-3 text-sm font-light bg-gray border rounded placeholder:text-[#e5e5e5] hover:bg-[#929191] focus:bg-[#d2d0d0] focus:shadow-[0px_2px_2px_#0002,0px_5px_10px_#0006] outline-none transition-all duration-500'
                        placeholder='Enter your password'
                        required
                    />

                    <button type='submit' className='w-full px-4 py-3 text-lg font-semibold text-white bg-black rounded-full hover:bg-[#3a3b3b] focus:bg-[#629677] focus:outline-none focus:ring-4 focus:ring-[#676e6782] transition-all duration-500 disabled:opacity-50 select-none' disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
                </form>
            </div>
        </>
    )
}

export default LoginPage;
