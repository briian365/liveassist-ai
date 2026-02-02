import React from 'react';
import './AnalysisCard.css';

const AnalysisCard = ({ analysis }) => {
  if (!analysis) return null;

  return (
    <div className="analysis-card">
      <div className="analysis-header">
        <span className="analysis-title">Real-Time Insight</span>
        <span className="analysis-confidence">{analysis.confidence * 100}% Confidence</span>
      </div>
      
      <div className="intent-badge">
        Detected Intent: {analysis.intent}
      </div>

      <div className="topic-tags">
        {analysis.topics.map((topic, index) => (
          <span key={index} className="topic-tag">#{topic}</span>
        ))}
      </div>

      <div className="ai-advice">
        "{analysis.advice}"
      </div>
    </div>
  );
};

export default AnalysisCard;
