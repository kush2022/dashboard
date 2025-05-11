import React, { useEffect, useState } from 'react';
import Card from '../ui/Card';
import { MessageSquare, BarChart2 } from 'lucide-react';
import axios from 'axios';

interface Question {
  question: string;
  frequency: number;
}

const TopQuestions: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rafikeybot.onrender.com/chatbot/questions');
        setQuestions(response.data);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Failed to load questions');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return (
      <Card title="Frequently Asked Questions" className="col-span-12">
        <div className="p-4 text-center">Loading questions...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Frequently Asked Questions" className="col-span-12">
        <div className="p-4 text-center text-red-500">{error}</div>
      </Card>
    );
  }

  // Sort questions by frequency (highest first)
  const sortedQuestions = [...questions].sort((a, b) => b.frequency - a.frequency);

  return (
    <Card title="Asked Questions" className="col-span-12 ">
      {/* Add fixed height container with overflow-y-auto for scrolling */}
      <div className="h-[35vh] overflow-y-auto">
        <div className="space-y-3 p-3">
          {sortedQuestions.length === 0 ? (
            <div className="p-4 text-center">No questions available</div>
          ) : (
            sortedQuestions.map((question, index) => (
              <div 
                key={index}
                className="p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-900/20 border border-emerald-100/30 dark:border-emerald-700/20 transition-all hover:bg-emerald-50/50 dark:hover:bg-emerald-900/30"
              >
                <div className="flex items-start">
                  <div className="mr-3 mt-1 p-2 rounded-full bg-emerald-100/50 dark:bg-emerald-800/30 text-emerald-700 dark:text-emerald-300">
                    <MessageSquare size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-base text-emerald-900 dark:text-emerald-100">{question.question}</p>
                    <div className="flex items-center mt-2 text-xs text-emerald-600 dark:text-emerald-400">
                      <div className="flex items-center">
                        <BarChart2 size={14} className="mr-1" />
                        <span>Asked {question.frequency} {question.frequency === 1 ? 'time' : 'times'}</span>
                      </div>
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

export default TopQuestions;
