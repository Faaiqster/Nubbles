# News Bubbles - Science & Tech News Summarizer

## Description

News Bubbles is a web application that fetches the latest science and technology news articles, summarizes them into concise, "bubble-sized" pieces of information, and presents them in an engaging visual format. It aims to provide users with quick, digestible updates from the world of science and tech.

The application uses the [gnews.io API](https://gnews.io/) to retrieve news articles and the [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview) for advanced text summarization.

## Architecture Overview

The project is structured into two main parts:

1.  **Frontend (`src` directory):**
    *   Built with React (using Vite), TypeScript, and styled with Tailwind CSS.
    *   Responsible for rendering the user interface and displaying the news bubbles.
    *   Fetches news data from the backend by calling the `/api/fetch-news` endpoint.

2.  **Backend (`api` directory):**
    *   Consists of Node.js-based Serverless Functions, specifically designed for deployment on [Vercel](https://vercel.com/).
    *   The primary function, `fetch-news.ts`, handles all external API interactions.
    *   It securely calls the gnews API to fetch news articles and the Google Gemini API to summarize their content. This approach ensures that API keys are not exposed to the client-side.

## Key Features

*   **Dynamic News Updates:** Fetches the latest news on page load and refresh.
*   **AI-Powered Summarization:** News content is summarized by Google's Gemini API for quick reading. If a high-quality description is available from the news source, it may be used directly to optimize API usage.
*   **Visual News Bubbles:** A clean and modern UI presenting news items in a "bubble" or card format.
*   **Breaking News Indicator:** Highlights very recent articles as "Breaking News."

## Tech Stack

*   **Frontend:**
    *   React
    *   Vite
    *   TypeScript
    *   Tailwind CSS
*   **Backend:**
    *   Node.js (for Serverless Functions)
    *   Vercel Serverless Functions (Express.js-like API structure)
*   **External APIs:**
    *   [gnews.io](https://gnews.io/) (for news fetching)
    *   [Google Gemini API](https://ai.google.dev/docs/gemini_api_overview) (for summarization)

## Setup and Running Locally

1.  **Clone the Repository:**
    ```bash
    git clone <repository-url>
    cd <repository-name>
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```

3.  **Configure Backend API Keys:**
    The backend serverless functions require API keys for gnews and Google Gemini to operate. These keys **must** be set as environment variables.
    *   `GNEWS_API_KEY`: Your API key from [gnews.io](https://gnews.io/).
    *   `GEMINI_API_KEY`: Your API key for the Google Gemini API from [Google AI Studio](https://aistudio.google.com/app/apikey).

    For detailed information on these keys, please refer to the `api/README.md` file.

    When running locally using the Vercel CLI (`vercel dev`), these variables can be placed in a `.env.local` file in the project root:
    ```env
    # .env.local
    GNEWS_API_KEY=your_gnews_api_key_here
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
    Alternatively, they can be set as system-wide environment variables.

4.  **Run the Development Server:**
    The recommended way to run the project locally, including the serverless functions, is using the Vercel CLI:
    ```bash
    npm install -g vercel # If you haven't already
    vercel dev
    ```
    This will typically start the application on `http://localhost:3000` and make the backend functions available under `/api`.

    If you only want to run the frontend (without live backend data, or if you have a separate backend running), you can use:
    ```bash
    npm run dev
    ```

## Deployment

This project is optimized for deployment on **Vercel** due to its use of serverless functions in the `api` directory.

1.  Connect your Git repository to Vercel.
2.  Configure the project settings (Vercel usually auto-detects Vite projects).
3.  **Crucially, set the following environment variables in your Vercel project settings:**
    *   `GNEWS_API_KEY`
    *   `GEMINI_API_KEY`

    Refer to `api/README.md` and the Vercel documentation for more details on setting environment variables.

## API Key Security Note

All API keys (for gnews and Google Gemini) are managed and used exclusively by the backend serverless functions. They are **not** exposed in the frontend code or to the client's browser, ensuring their security.

---

"Nubbles" was the initial codename; "News Bubbles - Science & Tech News Summarizer" is a more descriptive title.
Enjoy your summarized news!
