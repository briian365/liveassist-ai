// A simulated LLM that extracts context and generates advice from any text
export const analyzeText = (text) => {
  if (!text || text.length < 5) return null;

  const words = text.toLowerCase().split(/\s+/);
  
  // 1. Extract Topics (simulated by picking long words)
  const topics = words
    .filter(w => w.length > 4 && !['about', 'where', 'there', 'could', 'would', 'should'].includes(w))
    .map(w => w.replace(/[^a-z]/g, '')) // clean punctuation
    .filter(w => w.length > 4)
    .slice(0, 3);

  // 2. Detect Intent (simple heuristic)
  let intent = 'General Inquiry';
  if (words.some(w => ['return', 'refund', 'back', 'money'].includes(w))) intent = 'Requesting Refund';
  else if (words.some(w => ['track', 'where', 'status', 'late', 'arrive'].includes(w))) intent = 'Check Status';
  else if (words.some(w => ['broken', 'damage', 'fix', 'repair'].includes(w))) intent = 'Report Issue';
  else if (words.some(w => ['buy', 'purchase', 'cost', 'price'].includes(w))) intent = 'Sales Question';
  else if (words.some(w => ['login', 'password', 'access', 'account'].includes(w))) intent = 'Account Access';

  // 3. Generate "AI Advice"
  // This makes it feel like it understands ANYTHING by mirroring the topics back
  let advice = '';
  if (topics.length > 0) {
    advice = `I noticed you're asking about ${topics.join(', ')}. While I search for specific articles, ensure you have your account details ready.`;
  } else {
    advice = "I'm analyzing your request. Please provide more specific details.";
  }

  return {
    topics: topics.map(t => t.charAt(0).toUpperCase() + t.slice(1)), // Capitalize
    intent,
    advice,
    confidence: Math.min(0.7 + (words.length * 0.02), 0.98).toFixed(2) // Fake confidence score
  };
};
