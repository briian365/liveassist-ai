import React, { useState, useEffect } from 'react';
import SupportForm from './components/SupportForm';
import SmartSidebar from './components/SmartSidebar';
import { searchKB } from './data/mockKB';
import { findOrder } from './data/mockOrders';
import { analyzeText } from './utils/mockLLM';
import './App.css';

function App() {
  const [formData, setFormData] = useState({ subject: '', description: '', category: '' });
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // New "AI" States
  const [detectedOrder, setDetectedOrder] = useState(null);
  const [sentiment, setSentiment] = useState('neutral');
  const [suggestedCategory, setSuggestedCategory] = useState('');
  const [analysis, setAnalysis] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (agent, message) => {
    const time = new Date().toLocaleTimeString('en-US', { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
    setLogs(prev => [...prev.slice(-4), { time, agent, message }]); // Keep last 5 logs
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const query = `${formData.subject} ${formData.description}`;
    
    // 1. Reset if empty
    if (query.trim().length < 3) {
      setSuggestions([]);
      setDetectedOrder(null);
      setAnalysis(null);
      setSentiment('neutral');
      setIsLoading(false);
      // We don't clear logs to show history
      return;
    }

    // 2. Immediate Local "AI" Checks (No API Needed)
    
    // Check for Order ID
    const order = findOrder(query);
    if (order && !detectedOrder) {
        setDetectedOrder(order);
        addLog('ContextAgent', `Extracted Entity: ${order.id} (${order.status})`);
    } else if (!order && detectedOrder) {
        setDetectedOrder(null); 
    }

    // General Analysis (LLM fallback for "anything")
    const aiAnalysis = analyzeText(query);
    if (aiAnalysis && (!analysis || aiAnalysis.intent !== analysis.intent)) {
       setAnalysis(aiAnalysis);
       addLog('InsightsAgent', `Intent: ${aiAnalysis.intent} | Topics: ${aiAnalysis.topics.join(', ')}`);
    }

    // Check for Sentiment
    const negativeKeywords = ['angry', 'upset', 'broken', 'terrible', 'worst', 'hate', 'fail'];
    const isNegative = negativeKeywords.some(k => query.toLowerCase().includes(k)) || query === query.toUpperCase() && query.length > 20;
    
    if (isNegative && sentiment !== 'negative') {
        setSentiment('negative');
        addLog('SentimentAgent', 'Detected NEGATIVE emotion. Escalating priority.');
    } else if (!isNegative && sentiment === 'negative') {
        setSentiment('neutral');
    }

    // Categorization
    if (aiAnalysis && aiAnalysis.intent) {
         if (aiAnalysis.intent === 'Requesting Refund' && suggestedCategory !== 'returns') {
             setSuggestedCategory('returns');
             addLog('RoutingAgent', 'Auto-routing to: Returns & Refunds');
         }
         else if (aiAnalysis.intent === 'Check Status' && suggestedCategory !== 'shipping') {
             setSuggestedCategory('shipping');
             addLog('RoutingAgent', 'Auto-routing to: Shipping & Delivery');
         }
    }

    // 3. Simulated API Search
    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const results = await searchKB(query);
        if (results.length > 0) {
            // Only log if results changed significantly or first time (simplified for demo)
            // addLog('RetrievalAgent', `Found ${results.length} relevant articles.`);
        }
        setSuggestions(results);
      } catch (error) {
        console.error("Search failed", error);
      } finally {
        setIsLoading(false);
      }
    }, 600); 

    return () => clearTimeout(timer);
  }, [formData.subject, formData.description]); 

  return (
    <div className="app-container">
      <div className="app-grid">
        
        <div className="main-content">
           <div className="header-section">
             <h1 className="glow-text header-title">Help Center</h1>
             <p className="header-subtitle">We are here to assist you.</p>
           </div>
           
           <SupportForm 
              onInputChange={handleInputChange} 
              suggestedCategory={suggestedCategory}
           />
        </div>

        <div className="side-content">
           <SmartSidebar 
             suggestions={suggestions} 
             detectedOrder={detectedOrder}
             sentiment={sentiment}
             analysis={analysis}
             logs={logs}
             isLoading={isLoading} 
             visible={true} 
            />
        </div>

      </div>
    </div>
  );
}

export default App;
