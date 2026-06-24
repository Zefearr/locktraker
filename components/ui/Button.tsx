import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'outline';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...props
}: ButtonProps) => {

  const baseStyles = "inline-flex items-center cursor-pointer justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: "bg-purple-500 text-white hover:bg-purple-700 shadow-md",
    secondary: "bg-slate-800 text-slate-100 hover:bg-slate-700",
    danger: "bg-red-600 text-white hover:bg-red-700",
    outline: "border-2 border-purple-600 text-purple-600 hover:bg-purple-50"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 py-2 text-sm",
    lg: "h-12 px-8 text-base"
  };

  const finalClassName = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};

export default Button; 