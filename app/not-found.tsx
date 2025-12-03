"use client"
import Link from 'next/link'
import { Home, ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          404
        </h1>
        <h2 className="text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium"
          >
            <Home size={20} />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors font-medium"
          >
            <ArrowLeft size={20} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  )
}
