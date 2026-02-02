import { algoliasearch } from 'algoliasearch';

const appId = import.meta.env.VITE_ALGOLIA_APP_ID;
const searchKey = import.meta.env.VITE_ALGOLIA_SEARCH_KEY;

if (!appId || !searchKey) {
  console.warn('Algolia credentials not found. Falling back to mock search.');
}

export const algoliaClient = appId && searchKey 
  ? algoliasearch(appId, searchKey)
  : null;

export const KB_INDEX_NAME = 'liveassist_kb';
