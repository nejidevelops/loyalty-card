// utils/uuid.js
export function getOrCreateUUID() {
  let uuid = localStorage.getItem("zola_uuid");
  if (!uuid) {
    uuid = crypto.randomUUID();
    localStorage.setItem("zola_uuid", uuid);
  }
  return uuid;
}
