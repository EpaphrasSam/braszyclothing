export const setEmailCookie = (email: string) => {
  document.cookie = `email=${email}; path=/; SameSite=Lax; Secure;`;
};

export const getEmailCookie = () => {
  const emailCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("email="));
  return emailCookie ? emailCookie.split("=")[1] : null;
};

export const deleteEmailCookie = () => {
  document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax; Secure;`;
};
