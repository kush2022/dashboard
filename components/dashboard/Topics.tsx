import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import { Tag, BarChart2 } from 'lucide-react';
import axios from 'axios';

interface Topic {
  topic: string;
  confidence: number;
  keywords: string[];
}

const TopTopics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rafikeybot.onrender.com/chatbot/topics');
        setTopics(response.data);
      } catch (err) {
        console.error('Error fetching topics:', err);
        setError('Failed to load topics');
      } finally {
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  if (loading) {
    return (
      <Card title="Popular Topics" className="col-span-12 lg:col-span-8">
        <div className="p-4 text-center">Loading topics...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Popular Topics" className="col-span-12 lg:col-span-8">
        <div className="p-4 text-center text-red-500">{error}</div>
      </Card>
    );
  }

  // Sort topics by confidence (highest first)
  const sortedTopics = [...topics].sort((a, b) => b.confidence - a.confidence);

  return (
    <Card title="Popular Topics" className="col-span-12 lg:col-span-8">
      <div className="h-80 overflow-y-auto">
        <div className="space-y-3 p-3">
          {sortedTopics.length === 0 ? (
            <div className="p-4 text-center">No topics available</div>
          ) : (
            sortedTopics.map((topic, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-blue-50/30 dark:bg-blue-900/20 border border-blue-100/30 dark:border-blue-700/20 transition-all hover:bg-blue-50/50 dark:hover:bg-blue-900/30"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1 p-2 rounded-full bg-blue-100/50 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300">
                    <Tag size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm text-blue-900 dark:text-blue-100">{topic.topic}</p>
                    <div className="flex items-center mt-2 text-xs text-blue-600 dark:text-blue-400">
                      <div className="flex items-center mr-3">
                        <BarChart2 size={14} className="mr-1" />
                        <span>Confidence: {topic.confidence}%</span>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {topic.keywords.map((keyword, kidx) => (
                        <span 
                          key={kidx} 
                          className="px-2 py-1 text-xs rounded-full bg-blue-100/50 dark:bg-blue-800/30 text-blue-700 dark:text-blue-300"
                        >
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Card>
  );
};

export default TopTopics;
