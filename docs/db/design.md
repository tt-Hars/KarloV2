# Database Design Documentation

## Overview
This document outlines the database design for the Karlo application, utilizing DataStax Astra DB (Cassandra-based). The system is decoupled into two main schemas to support the microservices architecture: Authentication and Payment.

## Authentication Service
**Database:** Astra DB (via Stargate Mongoose)
**Collection:** `users`

### User Model
The `User` model manages user identity, authentication credentials, and basic profile information. It is accessed primarily by the `auth-service`.

| Field | Type | Required | Description |
|---|---|---|---|
| `_id` | ObjectId | Yes | Unique identifier for the user (automatically generated). |
| `name` | String | Yes | User's full name. |
| `email` | String | Yes | User's email address (Unique). |
| `password` | String | Yes | Hashed password. |
| `provider` | String | No | Auth provider (e.g., 'NONE', 'GOOGLE'). Default: 'NONE'. |
| `provider_user_id` | String | No | ID from external provider. Default: 'NONE'. |
| `subscription_details` | Object | No | Embedded object for subscription status. |
| `subscription_details.subscription_id` | String | No | Stripe Subscription ID. Default: 'NONE'. |
| `subscription_details.subscription_level` | String | No | Level of subscription (e.g., 'premium'). Default: 'NONE'. |
| `subscription_details.subscription_expiry` | Date | No | Expiration date of the subscription. Default: null. |
| `createdAt` | Date | Yes | Timestamp of creation. |
| `updatedAt` | Date | Yes | Timestamp of last update. |

## Payment Service
**Database:** Astra DB (via DataAPIClient)
**Collection:** `users` (Shared/accessed directly)

### Data Access Pattern
The `payment-service` does not maintain a separate user model but accesses the `users` collection directly to update subscription details upon successful payment events.

| Operation | Target Field | Description |
|---|---|---|
| Update Subscription | `subscription_details` | Updates `subscription_id`, `subscription_level`, and `subscription_expiry` after a successful Stripe checkout session. |

## Future Considerations
- **Separation of Concerns:** Ideally, subscription data should be decoupled into a separate `subscriptions` collection referenced by `user_id` to strictly enforce microservice boundaries. Currently, they share the `users` collection for simplicity in the legacy migration phase.
