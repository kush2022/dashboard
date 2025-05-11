import React from "react";
import Summary from "./dashboard/Summary";
// import ConversationMetrics from "./dashboard/ConversationMetrics";
// import HourlyActivity from "./dashboard/HourlyActivity";
import TopQuestions from "./dashboard/TopQuestions";
import SentimentAnalysis from "./dashboard/SentimentAnalysis";
import TopTopics from "./dashboard/Topics";
// import ThreadActivity from './dashboard/ThreadActivity';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6">
      <Summary />

      <div className="grid grid-cols-12 gap-6">
        <TopQuestions />
        {/* <HourlyActivity /> */}
        <TopTopics/>
        <SentimentAnalysis />
        {/* <ConversationMetrics />
        <ThreadActivity /> */}
        {/* <TopTopics />
        <UserDemographics />
        <ResponseTimes /> */}
      </div>
    </div>
  );
};

export default Dashboard;
