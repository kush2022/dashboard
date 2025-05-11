import React from 'react';
import { ArrowUpIcon, ArrowDownIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: number;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, change, className = '' }) => {
  return (
    <div className={`relative backdrop-blur-md bg-white/10 dark:bg-emerald-950/20 rounded-xl border border-emerald-100/20 dark:border-emerald-500/10 shadow-lg ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/5 dark:from-emerald-900/10 to-transparent pointer-events-none" />
      <div className="flex flex-col p-5 h-full">
        <div className="flex justify-between items-start">
          <div className="text-emerald-800/80 dark:text-emerald-200/80">{icon}</div>
          {/* {change !== undefined && (
            <div className={`flex items-center text-sm px-2 py-1 rounded-full ${change >= 0 ? 'text-emerald-700 bg-emerald-100/30 dark:text-emerald-300 dark:bg-emerald-800/30' : 'text-red-700 bg-red-100/30 dark:text-red-300 dark:bg-red-800/30'}`}>
              {change >= 0 ? <ArrowUpIcon size={12} className="mr-1" /> : <ArrowDownIcon size={12} className="mr-1" />}
              {Math.abs(change)}%
            </div>
          )} */}
        </div>
        <div className="mt-4">
          <p className="text-emerald-600 dark:text-emerald-300 text-sm font-medium">{title}</p>
          <p className="text-emerald-900 dark:text-emerald-50 text-2xl font-semibold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;