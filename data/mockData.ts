import { ConversationData, UserMetric, TopicData, SentimentData, ResponseTimeData, UserDemographic } from '../types';

// Generate dates for the past 30 days
const generateDates = (days: number) => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - i - 1));
    return date.toISOString().split('T')[0];
  });
};

const dates = generateDates(30);

export const userMetrics: UserMetric[] = dates.map(date => ({
  date,
  activeUsers: Math.floor(Math.random() * 500) + 100,
  newUsers: Math.floor(Math.random() * 100) + 10,
  returningUsers: Math.floor(Math.random() * 400) + 50,
}));

export const topQuestions: ConversationData[] = [
  { id: '1', user: 'user123', message: 'How do I reset my password?', timestamp: '2023-05-01T08:23:15', responseTime: 0.8, sentiment: 'neutral' },
  { id: '2', user: 'user456', message: 'What are your business hours?', timestamp: '2023-05-01T09:45:30', responseTime: 0.5, sentiment: 'neutral' },
  { id: '3', user: 'user789', message: 'How do I contact customer support?', timestamp: '2023-05-01T10:12:45', responseTime: 0.7, sentiment: 'neutral' },
  { id: '4', user: 'user101', message: 'Can I get a refund for my purchase?', timestamp: '2023-05-01T11:30:22', responseTime: 1.2, sentiment: 'negative' },
  { id: '5', user: 'user202', message: 'Do you offer international shipping?', timestamp: '2023-05-01T13:15:10', responseTime: 0.6, sentiment: 'neutral' },
];

export const topTopics: TopicData[] = [
  { topic: 'Account Issues', count: 1245, percentage: 28 },
  { topic: 'Product Information', count: 987, percentage: 22 },
  { topic: 'Billing', count: 876, percentage: 19 },
  { topic: 'Technical Support', count: 654, percentage: 14 },
  { topic: 'Shipping', count: 432, percentage: 10 },
  { topic: 'Other', count: 321, percentage: 7 },
];

export const sentimentData: SentimentData[] = dates.map(date => ({
  date,
  positive: Math.floor(Math.random() * 50) + 20,
  neutral: Math.floor(Math.random() * 40) + 30,
  negative: Math.floor(Math.random() * 20) + 5,
}));

export const responseTimeData: ResponseTimeData[] = dates.map(date => ({
  date,
  averageTime: parseFloat((Math.random() * 2 + 0.5).toFixed(2)),
}));

export const userDemographics: UserDemographic[] = [
  { category: 'North America', value: 40 },
  { category: 'Europe', value: 25 },
  { category: 'Asia', value: 20 },
  { category: 'South America', value: 8 },
  { category: 'Africa', value: 5 },
  { category: 'Oceania', value: 2 },
];

export const hourlyActivity = Array.from({ length: 24 }, (_, i) => ({
  hour: i,
  value: Math.floor(Math.random() * 80) + 20,
}));

// Calculate totals for summary metrics
export const summaryMetrics = {
  totalConversations: 15782,
  averageResponseTime: 0.9,
  resolutionRate: 94.3,
  userSatisfaction: 88.5,
};