# API Endpoints

This directory contains Vercel Serverless Functions for the application.

## Environment Variables

The following environment variables need to be configured in the Vercel deployment environment for the API endpoints to function correctly:

-   `GNEWS_API_KEY`: Your API key for accessing the gnews.io service. This is used to fetch news articles.
-   `GEMINI_API_KEY`: Your API key for accessing the Google Gemini API. This is used for summarizing news content.

Make sure these are set up in your Vercel project settings. Without them, the news fetching and summarization functionalities will fail.
