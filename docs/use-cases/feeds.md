# Feeds Use Cases

## View Feed
**Actor:** User
**Description:** User browses the main feed to see updates, inspiration, and discussions.
**Flow:**
1.  User navigates to the "Feeds" tab/page.
2.  System requests the latest feed items from `feeds-service`.
3.  System displays items in a Masonry grid.
4.  User scrolls down; system loads more items (infinite scroll).

## Create Post
**Actor:** User
**Description:** User shares content (text or image) to the feed.
**Flow:**
1.  User clicks the "Create" button.
2.  User selects type (Text or Image).
3.  User enters content/uploads image.
4.  System sends data to `feeds-service`.
5.  System confirms success and adds the item to the top of the feed (or refreshes).

## Like Item
**Actor:** User
**Description:** User likes a feed item.
**Flow:**
1.  User sees an interesting item.
2.  User clicks the "Heart" icon.
3.  System updates the local UI immediately (optimistic update).
4.  System sends API request to update the count.
