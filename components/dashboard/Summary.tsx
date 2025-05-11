"use client";
import React, { useEffect, useState } from "react";

import { Users, Clock} from "lucide-react";
import MetricCard from "../ui/MetricCard";
import { summaryMetrics } from "../../data/mockData";

const Summary: React.FC = () => {
  const [totalConversations, setTotalConversations] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchConversationCount = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("https://rafikeybot.onrender.com/chatbot/unique_thread_ids/count");
        if (!response.ok) {
          throw new Error("Failed to fetch conversation count");
        }
        const data = await response.json();
        setTotalConversations(data.count);
      } catch (error) {
        console.error("Error fetching conversation count:", error);
        // Fallback to mock data if API fails
        // setTotalConversations(summaryMetrics.totalConversations);
      } finally {
        setIsLoading(false);
      }
    };

    fetchConversationCount();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <MetricCard 
        title="Total Conversations"
        value={isLoading ? 'Loading...' : totalConversations.toLocaleString()}
        icon={<Users size={24} />}
        // change={5.2}
        // isLoading={isLoading}
      />

      <MetricCard
        title="Avg. Response Time"
        value={`${summaryMetrics.averageResponseTime}s`}
        icon={<Clock size={24} />}
        // change={-12.4}
      />

      {/* <MetricCard 
        title="Resolution Rate"
        value={`${summaryMetrics.resolutionRate}%`}
        icon={<CheckCircle size={24} />}
        change={2.1}
      />
      
      <MetricCard 
        title="User Satisfaction"
        value={`${summaryMetrics.userSatisfaction}%`}
        icon={<TrendingUp size={24} />}
        change={3.7}
      /> */}
    </div>
  );
};

export default Summary;
