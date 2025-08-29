import React from 'react'

export function Button({ children, variant = 'default', className = '', ...props }) {
  const base = 'px-4 py-2 rounded-xl font-medium text-sm transition-colors'
  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700',
    outline: 'border border-gray-300 text-gray-800 hover:bg-gray-100 bg-white',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  )
}
