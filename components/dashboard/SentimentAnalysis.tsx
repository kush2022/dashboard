import React, { useEffect, useState } from "react";
import Card from "../ui/Card";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

// Define types for our sentiment data
interface SentimentItem {
  sentiment: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  confidence: number;
  explanation: string;
}

// Define a type for the tooltip context
// interface DoughnutTooltipContext {
//   chart: ChartJS;
//   tooltip: {
//     dataPoints: Array<{
//       label: string;
//       raw: number;
//       formattedValue: string;
//     }>;
//   };
//   dataIndex: number;
//   dataset: {
//     data: number[];
//   };
//   label: string;
//   raw: number;
//   formattedValue: string;
// }

const SentimentAnalysis: React.FC = () => {
  const [sentimentData, setSentimentData] = useState<SentimentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        setLoading(true);
        const response = await axios.get('https://rafikeybot.onrender.com/chatbot/sentiment_analysis');
        setSentimentData(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching sentiment data:", err);
        setError("Failed to load sentiment data");
        setLoading(false);
      }
    };

    fetchSentimentData();
  }, []);

  // Get confidence values for each sentiment type
  const positiveConfidence = sentimentData.find(item => item.sentiment === "POSITIVE")?.confidence || 0;
  const neutralConfidence = sentimentData.find(item => item.sentiment === "NEUTRAL")?.confidence || 0;
  const negativeConfidence = sentimentData.find(item => item.sentiment === "NEGATIVE")?.confidence || 0;

  // Chart data
  const chartData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [positiveConfidence, neutralConfidence, negativeConfidence],
        backgroundColor: [
          'rgba(34, 197, 94, 0.8)',  // green-500
          'rgba(96, 165, 250, 0.8)',  // blue-400
          'rgba(239, 68, 68, 0.8)',   // red-500
        ],
        borderColor: [
          'rgba(34, 197, 94, 1)',
          'rgba(96, 165, 250, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '70%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context: TooltipItem<'doughnut'>) {
            const label = context.label || '';
            const value = context.raw || 0;
            return `${label}: ${value}% confidence`;
          }
        }
      }
    },
  };

  if (loading) {
    return (
      <Card title="User Sentiment Analysis" className="col-span-12 lg:col-span-4">
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-500">Loading sentiment data...</p>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="User Sentiment Analysis" className="col-span-12 lg:col-span-4">
        <div className="flex justify-center items-center h-40">
          <p className="text-red-500">{error}</p>
        </div>
      </Card>
    );
  }

  return (
    <Card title="User Sentiment Analysis" className="col-span-12 lg:col-span-4">
      <div className="space-y-4">
        <div className="flex justify-center items-center">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Positive
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-blue-400 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Neutral
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
              <span className="text-gray-700 dark:text-gray-300">
                Negative
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gray-50/30 dark:bg-gray-900/20 rounded-lg">
          {/* Donut Chart */}
          <div className="relative h-48 mb-4">
            <Doughnut data={chartData} options={chartOptions} />
            {/* Center text */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm text-gray-500">Confidence</span>
              <span className="text-2xl font-bold">100%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Positive
              </span>
              <span className="text-xl font-bold text-green-600 dark:text-green-400">
                {positiveConfidence}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Neutral
              </span>
              <span className="text-xl font-bold text-blue-500 dark:text-blue-400">
                {neutralConfidence}%
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Negative
              </span>
              <span className="text-xl font-bold text-red-600 dark:text-red-400">
                {negativeConfidence}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default SentimentAnalysis;
