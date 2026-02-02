import { algoliaClient, KB_INDEX_NAME } from '../utils/algoliaClient';

export const knowledgeBase = [
  {
    objectID: '1',
    title: 'Track your order',
    content: 'You can check the status of your order by visiting the "My Orders" section in your account. Alternatively, click the tracking link in your confirmation email.',
    category: 'Shipping',
    tags: ['shipping', 'delivery', 'track', 'where'],
    smartAction: {
      type: 'widget',
      component: 'OrderStatusWidget',
      label: 'Check Order Status'
    }
  },
  {
    objectID: '2',
    title: 'Refund Policy',
    content: 'We offer a 30-day money-back guarantee for all unused items in their original packaging. Initiating a return is free for premium members.',
    category: 'Returns',
    tags: ['refund', 'return', 'money back', 'exchange'],
    smartAction: {
      type: 'link',
      url: '/returns/start',
      label: 'Start a Return'
    }
  },
  {
    objectID: '3',
    title: 'Resetting your password',
    content: 'If you have forgotten your password, go to the login page and click "Forgot Password". We will send you a reset link via email.',
    category: 'Account',
    tags: ['password', 'login', 'account', 'access'],
    smartAction: {
      type: 'button',
      actionId: 'trigger_reset_email',
      label: 'Send Reset Link'
    }
  },
  {
    objectID: '4',
    title: 'International Shipping Rates',
    content: 'We ship to over 50 countries. Shipping rates are calculated at checkout based on weight and destination. Customs duties may apply.',
    category: 'Shipping',
    tags: ['international', 'global', 'shipping', 'customs']
  },
  {
    objectID: '5',
    title: 'Product Care Instructions',
    content: 'To seek the best longevity for your products, avoid direct sunlight and wash with cold water. Dry cleaning is recommended for wool items.',
    category: 'Product',
    tags: ['care', 'washing', 'cleaning', 'maintenance']
  },
  {
    objectID: '6',
    title: 'Premium Membership Benefits',
    content: 'Premium members enjoy free shipping on all orders, early access to sales, and dedicated support. Join today for $9.99/month.',
    category: 'Membership',
    tags: ['premium', 'subscription', 'benefits', 'shipping']
  }
];

// Real Algolia Search (with fallback to local for development without credentials)
export const searchKB = async (query) => {
  if (!query || query.trim().length < 3) {
    return [];
  }

  // Use real Algolia if client is available
  if (algoliaClient) {
    try {
      const response = await algoliaClient.search({
        requests: [
          {
            indexName: KB_INDEX_NAME,
            query: query,
            hitsPerPage: 3
          }
        ]
      });
      return response.results[0].hits || [];
    } catch (error) {
      console.error('Algolia search failed:', error);
      // Fall through to local search
    }
  }

  // Fallback: Local search if Algolia is unavailable
  const lowerQuery = query.toLowerCase();
  const keywords = lowerQuery.split(/\s+/).filter(word => word.length > 2);

  if (keywords.length === 0) return [];

  return knowledgeBase.filter(item => {
    const itemText = `${item.title} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
    return keywords.some(keyword => itemText.includes(keyword));
  }).slice(0, 3);
};
