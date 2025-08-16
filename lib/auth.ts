import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "./db";
import bcrypt from "bcryptjs";
import User from "@/models/User";

export const authOptions: NextAuthOptions = {
    providers: [
    CredentialsProvider({
        name: "Credentials",
        credentials: {
            email: {label: "Email", type: "text"},
            password: {label: "Password", type: "password"}
        },
        async authorize(credentials) {
            if(!credentials?.email || !credentials?.password) {
                throw new Error("Missing Email or Password")
            }

            try {
                await connectToDatabase()
                const user = await User.findOne({email: credentials.email});
                
                if(!user) {
                     throw new Error("No user found with this ")
                }

            const isValid = await bcrypt.compare(
                credentials.password,
                user.password)

            if(!isValid) {
                throw new Error("invalid password ")
            }

            return {
                id: user._id.toString(),
                email: user.email
            }
             } catch (error) {
                console.error("Auth Eroor", error)
                throw error
            }
        }
    })
  ], 
};