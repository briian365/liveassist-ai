// Indexing Script - Run once with: node scripts/indexKB.js
import { algoliasearch } from 'algoliasearch';

const APP_ID = '73FXALGA8Y';
const ADMIN_KEY = '1c326ae999d69ef83799a3ecd1d37409';
const INDEX_NAME = 'liveassist_kb';

const client = algoliasearch(APP_ID, ADMIN_KEY);

const knowledgeBase = [
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

async function indexData() {
  try {
    console.log('Saving records to Algolia index:', INDEX_NAME);
    const response = await client.saveObjects({
      indexName: INDEX_NAME,
      objects: knowledgeBase
    });
    console.log('Indexing complete!', response);
  } catch (error) {
    console.error('Indexing failed:', error);
    process.exit(1);
  }
}

indexData();
