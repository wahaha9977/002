import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "@/lib/utils";

interface PixelButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const PixelButton: React.FC<PixelButtonProps> = ({ children, onClick, className = "" }) => {
  return (
    <motion.button
      whileTap={{ y: 4 }}
      className={cn(
        "bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 px-6 rounded-md relative overflow-hidden",
        "border-4 border-amber-800 dark:border-amber-900",
        "before:absolute before:inset-0 before:bg-amber-500 before:transform before:translate-y-2 before:translate-x-2 before:border-4 before:border-amber-800 dark:before:border-amber-900",
        "active:before:translate-y-0 active:before:translate-x-0 transition-transform duration-100",
        className
      )}
      onClick={onClick}
    >
      <span className="relative z-10 flex items-center justify-center">
        {children}
      </span>
    </motion.button>
  );
};