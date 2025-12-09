# Feeds Feature Design Document

## Overview
The Feeds feature provides a social feed for users, combining elements from Reddit (text/discussion), Instagram (visuals), and Pinterest (layout). It is implemented as a standalone microservice backed by Astra DB.

## Architecture

### Microservice: `feeds-service`
*   **Port:** 3335 (Internal Only)
*   **Database:** Astra DB
*   **Collection:** `FEEDS_COLLECTION` (env variable)
*   **Framework:** Express.js

### API Endpoints
*   `GET /api/v1/feed`: Retrieve a paginated list of feed items.
*   `POST /api/v1/feed`: Create a new feed item.
*   `GET /api/v1/feed/:id`: Retrieve a single feed item.

### Data Model
The feed items are stored as JSON documents in Astra DB.

```typescript
interface FeedItem {
  _id: string;
  type: 'image' | 'text' | 'mixed';
  title?: string;
  content: string; // Text content or description
  mediaUrl?: string; // For images
  aspectRatio?: number; // For Pinterest-style layout
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  stats: {
    likes: number;
    comments: number;
    shares: number;
  };
  createdAt: string;
}
```

## UI Design
The UI aims for a "Coherent Chaos" look, utilizing a Masonry grid layout.

*   **Grid:** Responsive Masonry layout.
*   **Cards:**
    *   **Image Cards (Insta/Pinterest):** Full bleed images, overlay actions on hover, minimal text.
    *   **Text Cards (Reddit):** Bold typography, clear title, preview of text, action bar at bottom.
*   **Interactions:** Heart icon (Like), Comment bubble, Share arrow.

## Integration
*   **Gateway:** The Gateway Service proxies requests to `feeds-service`.
*   **Frontend:** A new `Feed` view in the shared UI library consumes the API.
