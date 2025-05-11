import React from 'react';
import Card from '../ui/Card';
import { hourlyActivity } from '../../data/mockData';

const HourlyActivity: React.FC = () => {
  const maxValue = Math.max(...hourlyActivity.map(h => h.value));
  
  return (
    <Card title="24-Hour Activity Pattern" className="col-span-12 lg:col-span-4">
      <div className="space-y-4">
        <div className="h-64 flex items-end">
          {hourlyActivity.map((hour, index) => (
            <div 
              key={index} 
              className="flex-1 flex flex-col items-center justify-end"
            >
              <div 
                className="w-full bg-emerald-500/70 dark:bg-emerald-400/70 rounded-t-sm hover:bg-emerald-600/70 dark:hover:bg-emerald-500/70 transition-all duration-300"
                style={{ 
                  height: `${(hour.value / maxValue) * 100}%`,
                  maxHeight: '90%',
                  margin: '0 1px'
                }}
              >
                <div className="invisible group-hover:visible absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-emerald-800 text-white text-xs rounded">
                  {hour.value}
                </div>
              </div>
              {index % 4 === 0 && (
                <span className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {hour.hour}:00
                </span>
              )}
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-sm text-emerald-700 dark:text-emerald-300">
            Peak hour: <span className="font-medium">14:00 - 15:00</span>
          </p>
          <p className="text-sm text-emerald-700 dark:text-emerald-300 mt-1">
            Lowest activity: <span className="font-medium">03:00 - 04:00</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default HourlyActivity;