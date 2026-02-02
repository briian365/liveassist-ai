import React, { useEffect, useRef } from 'react';
import './ActivityLog.css';

const ActivityLog = ({ logs }) => {
  const containerRef = useRef(null);

  // Auto-scroll to bottom of log
  useEffect(() => {
    if (containerRef.current) {
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="activity-log" ref={containerRef}>
      {logs.length === 0 && <div className="log-entry" style={{fontStyle: 'italic'}}>System ready. Waiting for input...</div>}
      
      {logs.map((log, index) => (
        <div key={index} className="log-entry animate-fade-in">
          <span className="log-timestamp">[{log.time}]</span>
          <span className="log-agent">{log.agent}:</span>
          <span className="log-message">{log.message}</span>
        </div>
      ))}
    </div>
  );
};

export default ActivityLog;
