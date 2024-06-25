import {jwtDecode} from 'jwt-decode';

export const isTokenExpired = (token) => {
  if (!token) return true;

  const { exp } = jwtDecode(token);
  if (exp * 1000 < Date.now()) {
    return true;
  }

  return false;
};
