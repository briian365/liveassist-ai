import React from 'react';
import './SupportForm.css';

const SupportForm = ({ onInputChange, suggestedCategory }) => {
  const [internalCategory, setInternalCategory] = React.useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'category') setInternalCategory(value);
    onInputChange(name, value);
  };

  // React to AI suggestion by updating local state
  React.useEffect(() => {
    if (suggestedCategory) {
       setInternalCategory(suggestedCategory);
       // We don't auto-call onInputChange here because the parent already knows the suggestedCategory
    }
  }, [suggestedCategory]);

  return (
    <div className="glass-panel support-form animate-fade-in">
      <div className="form-header">
        <h2 className="glow-text">Submit a Request</h2>
        <p>Describe your issue and we'll help you resolve it.</p>
      </div>

      <div className="form-group">
        <label htmlFor="category">Category {suggestedCategory && <span style={{fontSize:'0.7em', color: 'var(--accent)'}}>(AI Suggested)</span>}</label>
        <select 
          id="category" 
          name="category" 
          className="form-select"
          value={internalCategory}
          onChange={handleChange}
        >
          <option value="">Select a category...</option>
          <option value="shipping">Shipping & Delivery</option>
          <option value="returns">Returns & Refunds</option>
          <option value="product">Product Info</option>
          <option value="account">Account & Security</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          type="text"
          id="subject"
          name="subject"
          placeholder="e.g., Where is my order?"
          className="form-input"
          onChange={handleChange}
          autoComplete="off"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          placeholder="Please provide details about your issue..."
          className="form-textarea"
          onChange={handleChange}
        />
      </div>

      <button className="submit-btn" type="button">
        Submit Ticket
      </button>
    </div>
  );
};

export default SupportForm;
