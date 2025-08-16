"use client";
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

function RegisterPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const router  = useRouter();

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(password === confirmPassword){
            alert("Password do not match")
            return;
        }

        try {
            const response = await fetch("/api/auth/register", 
                {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password,})
                }
            )

            const data = await response.json();

            if(!response.ok){
                throw new Error(data.message || "Registration failed");
            }
        } catch (error) {
            console.error("Error during registration:", error);   
        }
    }


  return (
    <div>
      {/* with tailwindcss */}
        <form onSubmit={handleSubmit} className="max-w-md   mx-auto p-4 bg-white rounded shadow-md">
            <h2 className="text-2xl font-bold mb-4">Register</h2>
            <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input 
                type="email" 
                id="email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input 
                type="password" 
                id="password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <div className="mb-4">
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                <input 
                    type="password" 
                    id="confirmPassword" 
                    value={confirmPassword} 
                    onChange={(e) => setConfirmPassword(e.target.value)} 
                    required 
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
            </div>

            <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700  transition duration-200">Register
                <span className="ml-2">→</span>
            </button>
        </form>
        <div>
            <p className="mt-4 text-center text-sm text-gray-600">
                Already have an account?{" "}
                <button className="text-blue-600 hover:text-blue-500 cursor-pointer" onClick={() => router.push("/login")}>
                    Login
                </button>
            </p>
        </div>
    </div>
  )
}

export default RegisterPage
