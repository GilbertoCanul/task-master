import React from 'react';

// Extendemos los atributos estándar de un botón HTML para no perder nada (onClick, disabled, etc.)
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'danger' | 'ghost';
}

export const Button = ({ 
  children, 
  className = '', 
  variant = 'primary', 
  ...props 
}: ButtonProps) => {
  
  // Definimos las clases base que todos los botones deben tener
  const baseStyles = "px-4 py-2 rounded-lg font-medium transition-all cursor-pointer disabled:opacity-50";
  
  // Definimos las variantes
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-100 hover:bg-red-200 text-red-600",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
  };

  const variantStyles = variant ? variants[variant] : "";

  return (
    <button 
      {...props} 
      className={`${baseStyles} ${variantStyles} ${className}`}
    >
      {children}
    </button>
  );
};