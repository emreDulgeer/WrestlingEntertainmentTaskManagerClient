const getRoleFromToken = (decodedToken) => {
  if (!decodedToken) return null;
  return decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
};

export default getRoleFromToken;
