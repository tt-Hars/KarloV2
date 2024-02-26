export interface User {
  user_id: string;
  username: string;
  email: string;
  password: string;
  provider: string | null;
  provider_user_id: string | null;
  subscription_level: string;
  subscription_expiry: Date | null;
  created_at: Date;
}