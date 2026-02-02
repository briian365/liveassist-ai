# LiveAssist AI - Smart Support Portal

*This is a submission for the [Algolia Agent Studio Challenge](https://dev.to/challenges/algolia): Consumer-Facing Non-Conversational Experiences*

## What I Built
**LiveAssist AI** is a multi-agent system that transforms static support forms into a proactive, intelligent assistance experience. It operates entirely in the background as the user types, using a "Neural Link" visualization to show its reasoning process.

It employs **four specialized Nano-Agents** that run in real-time in the browser:
1.  **Retrieval Agent**: Fetches relevant solutions from **Algolia** in <50ms.
2.  **Context Agent**: Scans for specific entities like Order IDs (e.g., `ORD-12345`) and instantly pulls up dynamic tracking widgets.
3.  **Sentiment Agent**: Analyzes the emotional tone of the request to prioritize urgent or frustrated customers.
4.  **Generative Insights Agent**: Provides immediate AI analysis and advice for **any** topic, effectively "thinking" alongside the user.

### Key Features
*   **📡 Agent Activity Log**: A "Terminal" view at the bottom of the sidebar that reveals the system's thought process.
*   **⚡ Proactive Knowledge Retrieval**: As the user types, relevant articles appear instantly from Algolia.
*   **📦 Dynamic Order Context**: Type `"Where is ORD-12345?"` and watch the sidebar transform to show the live status of that specific order.
*   **❤️ Sentiment Awareness**: Detects frustration keywords and flags the ticket for "Priority Support".
*   **🔮 Generative Insights**: Type anything! The AI extracts topics and intent to give you instant feedback.

## Demo
*(Insert your screenshots or Loom video link here)*

## How I Used Algolia Agent Studio

### Data Indexed
The Knowledge Base articles are indexed in Algolia with the following structure:
```json
{
  "objectID": "1",
  "title": "Track your order",
  "content": "You can check the status of your order...",
  "category": "Shipping",
  "tags": ["shipping", "delivery", "track"],
  "smartAction": { "type": "widget", "label": "Check Order Status" }
}
```

### Targeted Prompting Approach
The retrieval is enhanced by:
1.  **Multi-attribute search**: Queries match against `title`, `content`, and `tags` for maximum recall.
2.  **Smart Actions**: Each indexed record can include a `smartAction` object that triggers context-aware buttons (e.g., "Start a Return").
3.  **Instant Feedback Loop**: Results are fetched on every keystroke (debounced) to create a "search as you think" experience.

## Why Fast Retrieval Matters
In a support context, every second matters. By retrieving solutions *before* the ticket is submitted:
- **Reduces ticket volume** by helping users self-serve.
- **Increases satisfaction** with instant, relevant answers.
- **Feels magical** because suggestions appear in real-time as the user types.

Algolia's <50ms response time makes this experience seamless—any slower and the UI would feel laggy.

## How to Run Locally

### Prerequisites
- Node.js 18+
- An Algolia account ([free tier](https://www.algolia.com/))

### Setup
1.  **Clone and install**:
    ```bash
    git clone <repo-url>
    cd Algolia
    npm install
    ```

2.  **Configure Algolia credentials**:
    ```bash
    cp .env.example .env
    # Edit .env with your Algolia App ID and Search API Key
    ```

3.  **Index the Knowledge Base** (one-time):
    ```bash
    node scripts/indexKB.js
    ```

4.  **Start the Dev Server**:
    ```bash
    npm run dev
    ```

5.  Open [http://localhost:5173](http://localhost:5173).

## Try These Scenarios

| Scenario | Type This | Observe |
|----------|-----------|---------|
| Order Tracking | "Where is ORD-12345?" | Order card with progress bar |
| Frustration | "I am angry about this!" | Priority Support alert |
| Returns | "I want a refund" | Category auto-selects "Returns" |
| General | "Do you sell headphones?" | AI extracts intent "Sales Question" |

## Tech Stack
- **Framework**: React + Vite
- **Search**: Algolia (`algoliasearch`)
- **Styling**: Vanilla CSS (Glassmorphism Design)
