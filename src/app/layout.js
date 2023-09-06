import AuthProvider from './contexts/AuthContext'
import LocaleProvider from './contexts/LocaleContext'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'Punchy',
    description: 'Punchy',
}

export default function RootLayout({ children }) {
    return (
        <AuthProvider>
            <LocaleProvider>
                <html lang="en">
                    <body className="bg-zinc-900 text-gray-200">{children}</body>
                </html>
            </LocaleProvider>
        </AuthProvider>
    )
}

