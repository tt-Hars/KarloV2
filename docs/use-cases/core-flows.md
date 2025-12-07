# Use Case Documentation

## 1. User Registration
**Actor:** Guest User
**System:** Auth Service
**Description:** A new user creates an account to access the platform.
**Flow:**
1. User provides Name, Email, and Password.
2. System validates email uniqueness.
3. System hashes the password.
4. System creates a new `User` record in Astra DB.
5. System generates Access and Refresh tokens.
6. System returns user profile and sets HTTP-only cookies.

## 2. User Login
**Actor:** Registered User
**System:** Auth Service
**Description:** An existing user logs in to access protected resources.
**Flow:**
1. User provides Email and Password.
2. System verifies credentials against Astra DB.
3. If valid, System generates Access and Refresh tokens.
4. System returns user profile and sets HTTP-only cookies.

## 3. Subscription Payment
**Actor:** Authenticated User
**System:** Payment Service, Gateway, Stripe
**Description:** User purchases a subscription plan.
**Flow:**
1. User selects a product/plan.
2. Frontend calls `payment-service` to create a Stripe Checkout Session.
3. System returns Stripe URL.
4. User completes payment on Stripe.
5. Stripe redirects user to `FRONTEND_URL/payment?success=true`.
6. Frontend calls `payment-service/update_user_data` with session ID.
7. Payment Service verifies session with Stripe.
8. Payment Service directly updates the user's `subscription_details` in Astra DB with expiry and level.

## 4. Token Refresh
**Actor:** Authenticated User (Client App)
**System:** Auth Service
**Description:** Client obtains a new Access Token using a valid Refresh Token.
**Flow:**
1. Access Token expires.
2. Client calls `/refresh` endpoint with the HTTP-only Refresh Token cookie.
3. System verifies Refresh Token signature and checks User existence.
4. If valid, System issues a new Access Token cookie.
