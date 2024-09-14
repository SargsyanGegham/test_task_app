/**
 * Check is user authenticated.
 * @returns { boolean }
 */
export const isAuthenticated = () => {
  return typeof window !== "undefined" && localStorage.getItem("token") !== null;
};
  