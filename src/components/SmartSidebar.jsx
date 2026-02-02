import AnalysisCard from './AnalysisCard';
import ActivityLog from './ActivityLog';
import './SmartSidebar.css';

const SmartSidebar = ({ suggestions, detectedOrder, sentiment, analysis, isLoading, logs, visible }) => {
  if (!visible) return null;

  return (
    <div className={`smart-sidebar animate-fade-in`}>
      <div className="sidebar-header">
        <div className="ai-icon"></div>
        <span>LiveAssist AI</span>
      </div>

      <div className="suggestions-list" style={{ flex: 1 }}>
        {isLoading ? (
          <>
            <div className="loading-skeleton"></div>
            <div className="loading-skeleton"></div>
          </>
        ) : (
          <>
            {/* 0. Real-time Analysis (For 'Anything') */}
            {analysis && null} {/* Hide Analysis Card if we have specific matches to reduce clutter, or keep it? Let's keep it as a fallback or "meta" layer */}
             {/* Actually, let's keep it visible but maybe smaller? No, let's just stack them. */}
            {analysis && !detectedOrder && suggestions.length === 0 && <AnalysisCard analysis={analysis} />}
            {/* ONLY show Analysis Card if we DON'T have a specific Order or strong KB match, 
                OR if the user effectively asked a general question. 
                Let's simplify: Show it if we have it, but maybe prioritize others.
                Actually, your previous prompt asked for "Anything" to work. 
                So let's always show it if nothing else specific is found, OR if it's high confidence.
             */}
            {analysis && (suggestions.length === 0 && !detectedOrder) && <AnalysisCard analysis={analysis} />}

            {/* 1. Priority Alert */}
            {sentiment === 'negative' && (
               <div className="sentiment-alert">
                 <div className="sentiment-icon">❤️</div>
                 <div className="sentiment-text">
                   <h4>Priority Support</h4>
                   <p>We see you're upset. We've flagged this for a senior agent.</p>
                 </div>
               </div>
            )}

            {/* 2. Recognized Order Card */}
            {detectedOrder && (
              <div className="suggestion-card order-card">
                 <div className="order-card-header">
                   <span className="order-id">{detectedOrder.id}</span>
                   <span className="order-status">{detectedOrder.status}</span>
                 </div>
                 <div className="card-title">Order Details</div>
                 <div className="order-items">
                   <ul>
                     {detectedOrder.items.map((item, idx) => (
                       <li key={idx}>{item}</li>
                     ))}
                   </ul>
                 </div>
                 <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                   Courier: {detectedOrder.courier}
                 </div>
                 <div className="progress-bar-container">
                   <div className="progress-bar" style={{ width: `${detectedOrder.progress}%` }}></div>
                 </div>
              </div>
            )}

            {/* 3. Knowledge Base Suggestions */}
            {suggestions.length > 0 ? (
              suggestions.map((item) => (
                <div key={item.objectID} className="suggestion-card">
                  <div className="card-title">{item.title}</div>
                  <div className="card-snippet">{item.content}</div>
                  
                  {item.smartAction && (
                    <button className="smart-action-btn">
                      {item.smartAction.label} ⚡
                    </button>
                  )}
                </div>
              ))
            ) : !detectedOrder && !analysis && (
              <div className="empty-state">
                Start typing to see AI suggestions...
              </div>
            )}
          </>
        )}
      </div>

      <div style={{ marginTop: 'auto', paddingTop: '1rem' }}>
         {logs && <ActivityLog logs={logs} />}
      </div>
    </div>
  );
};

export default SmartSidebar;
