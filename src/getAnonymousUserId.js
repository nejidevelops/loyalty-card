// utils/getAnonymousUserId.js
export function getAnonymousUserId() {
  const key = "zola_loyalty_user_id";
  let userId = localStorage.getItem(key);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(key, userId);
  }
  return userId;
}
