import React, { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`relative overflow-hidden backdrop-blur-md bg-white/10 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/20 dark:border-emerald-500/10 shadow-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/5 dark:from-emerald-900/10 to-transparent pointer-events-none" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-emerald-900 dark:text-emerald-100 mb-4">{title}</h3>
        {children}
      </div>
    </div>
  );
};

export default Card;