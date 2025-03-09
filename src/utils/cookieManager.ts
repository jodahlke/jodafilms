/**
 * Utility functions for managing cookies in the application
 */

// Set a cookie with specified name, value, and optional expiry days
export const setCookie = (name: string, value: string, days = 365): void => {
  if (typeof window === 'undefined') return;
  
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);
  
  const cookie = `${name}=${encodeURIComponent(value)}; expires=${expiryDate.toUTCString()}; path=/; SameSite=Strict`;
  document.cookie = cookie;
};

// Get a cookie by name
export const getCookie = (name: string): string | null => {
  if (typeof window === 'undefined') return null;
  
  const nameEQ = `${name}=`;
  const cookies = document.cookie.split(';');
  
  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i].trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  return null;
};

// Delete a cookie by name
export const deleteCookie = (name: string): void => {
  if (typeof window === 'undefined') return;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Strict`;
};

// Check if cookies are enabled in the browser
export const areCookiesEnabled = (): boolean => {
  if (typeof window === 'undefined') return false;
  
  try {
    setCookie('cookieTest', 'test', 1);
    const enabled = getCookie('cookieTest') !== null;
    deleteCookie('cookieTest');
    return enabled;
  } catch (e) {
    return false;
  }
}; 