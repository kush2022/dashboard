export interface ConversationData {
    id: string;
    user: string;
    message: string;
    timestamp: string;
    responseTime: number;
    sentiment: 'positive' | 'neutral' | 'negative';
  }
  
  export interface UserMetric {
    date: string;
    activeUsers: number;
    newUsers: number;
    returningUsers: number;
  }
  
  export interface TopicData {
    topic: string;
    count: number;
    percentage: number;
  }
  
  export interface SentimentData {
    date: string;
    positive: number;
    neutral: number;
    negative: number;
  }
  
  export interface ResponseTimeData {
    date: string;
    averageTime: number;
  }
  
  export interface UserDemographic {
    category: string;
    value: number;
  }