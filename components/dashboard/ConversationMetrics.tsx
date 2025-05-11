import React, { useState, useEffect } from "react";
import Card from "../ui/Card";
import LineChart from "../ui/LineChart";

interface TimeSeriesData {
  time_period: string;
  conversation_count: number;
}

interface ConversationTimeSeriesResponse {
  interval: string;
  days_range: number;
  data: TimeSeriesData[];
}

const ConversationMetrics: React.FC = () => {
  // Change the initial state to "hour" for timeRange and 1 for daysRange
  const [timeRange, setTimeRange] = useState<string>("hour");
  const [daysRange, setDaysRange] = useState<number>(1);
  const [chartData, setChartData] = useState<{ date: string; value: number }[]>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConversationData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `https://rafikeybot.onrender.com/chatbot/conversations/time_series?interval=${timeRange}&days=${daysRange}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch conversation data");
        }

        const responseData: ConversationTimeSeriesResponse =
          await response.json();

        // Transform the data to match the LineChart component's expected format
        const formattedData = responseData.data.map((item) => ({
          date: item.time_period,
          value: item.conversation_count,
        }));

        setChartData(formattedData);
      } catch (err) {
        console.error("Error fetching conversation data:", err);
        setError("Failed to load conversation data. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversationData();
  }, [timeRange, daysRange]);

  const handleTimeRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;

    // Parse the selected value to set both interval and days
    if (value === "7days") {
      setTimeRange("day");
      setDaysRange(7);
    } else if (value === "30days") {
      setTimeRange("day");
      setDaysRange(30);
    } else if (value === "90days") {
      setTimeRange("day");
      setDaysRange(90);
    } else if (value === "hourly") {
      setTimeRange("hour");
      setDaysRange(1);
    } else if (value === "weekly") {
      setTimeRange("week");
      setDaysRange(90);
    } else if (value === "monthly") {
      setTimeRange("month");
      setDaysRange(365);
    }
  };

  // Helper function to determine the current value for the select dropdown
  const getCurrentTimeRangeValue = () => {
    if (timeRange === "hour" && daysRange === 1) return "hourly";
    if (timeRange === "day" && daysRange === 7) return "7days";
    if (timeRange === "day" && daysRange === 30) return "30days";
    if (timeRange === "day" && daysRange === 90) return "90days";
    if (timeRange === "week" && daysRange === 90) return "weekly";
    if (timeRange === "month" && daysRange === 365) return "monthly";
    return "hourly"; // Default fallback
  };

  return (
    <Card title="Conversation Volume" className="col-span-12 lg:col-span-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex space-x-4 text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-emerald-700 dark:text-emerald-300">
                Conversations
              </span>
            </div>
          </div>
          <div>
            <select
              className="text-xs rounded-md bg-emerald-50/50 dark:bg-emerald-900/30 border border-emerald-100/30 dark:border-emerald-700/30 text-emerald-800 dark:text-emerald-200 px-2 py-1"
              onChange={handleTimeRangeChange}
              value={getCurrentTimeRangeValue()}
            >
              <option value="hourly">Hourly (24h)</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </div>

        <div className="h-64">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-pulse text-emerald-600">
                Loading data...
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full text-red-500">
              {error}
            </div>
          ) : chartData.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              No conversation data available for the selected time range.
            </div>
          ) : (
            <LineChart data={chartData} color="emerald" height={250} />
          )}
        </div>

        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-900/20">
            <span className="text-sm text-emerald-600 dark:text-emerald-400">
              Total Conversations
            </span>
            <span className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
              {isLoading
                ? "..."
                : chartData
                    .reduce((sum, item) => sum + item.value, 0)
                    .toLocaleString()}
            </span>
          </div>
          {/* <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-900/20">
            <span className="text-sm text-emerald-600 dark:text-emerald-400">Avg. Daily</span>
            <span className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
              {isLoading ? '...' : 
                (chartData.length > 0 
                  ? Math.round(chartData.reduce((sum, item) => sum + item.value, 0) / chartData.length).toLocaleString() 
                  : '0'
                )
              }
            </span>
          </div> */}
          {/* <div className="flex flex-col items-center p-3 rounded-lg bg-emerald-50/30 dark:bg-emerald-900/20">
            <span className="text-sm text-emerald-600 dark:text-emerald-400">Peak Volume</span>
            <span className="text-xl font-bold text-emerald-800 dark:text-emerald-200">
              {isLoading ? '...' : 
                (chartData.length > 0 
                  ? Math.max(...chartData.map(item => item.value)).toLocaleString() 
                  : '0'
                )
              }
            </span>
          </div> */}
        </div>
      </div>
    </Card>
  );
};

export default ConversationMetrics;
