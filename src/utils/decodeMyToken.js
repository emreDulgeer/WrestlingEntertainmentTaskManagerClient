import {jwtDecode} from 'jwt-decode';

const decodeMyToken = (token) => {
  if (!token) return null;

  try {
    return jwtDecode(token); // Token'ı çözmek için jwt-decode kullanıyoruz
  } catch (error) {
    console.error('Invalid token:', error);
    return null; // Geçersiz token durumunda null döndürüyoruz
  }
};

export default decodeMyToken;
