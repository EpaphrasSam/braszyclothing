export const setEmailCookie = (email: string) => {
  const expirationTime = new Date();
  expirationTime.setMinutes(expirationTime.getMinutes() + 10);
  const cookieValue = `${email}|${expirationTime.toISOString()}`;
  document.cookie = `email=${encodeURIComponent(cookieValue)}; expires=${expirationTime.toUTCString()}; path=/;`;
};

export const getEmailCookie = () => {
  const emailCookie = document.cookie
    .split("; ")
    .find((cookie) => cookie.startsWith("email="));

  if (!emailCookie) {
    return null;
  }

  const cookieValue = decodeURIComponent(emailCookie.split("=")[1]);
  const [email, expiration] = cookieValue.split("|");

  if (new Date() > new Date(expiration)) {
    deleteEmailCookie();
    return null;
  }

  return email;
};

export const deleteEmailCookie = () => {
  document.cookie = `email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};
