"use server"
import { auth } from '@/auth';
import axios from 'axios'
import { signOut } from "next-auth/react"; // Client-side signOut

const axiosServerInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // API URL
  maxBodyLength: Infinity,
  maxContentLength: Infinity,
  timeout: 10000
})

axiosServerInstance.interceptors.request.use(
  async (config) => {
    config.maxBodyLength = Infinity
    config.maxContentLength = Infinity
    
    // Session'ı server-side'da al
    const session = await auth();

    if (!session) {
      return Promise.reject("No session found.");
    }

    if (session.user.accessToken) {      
      config.headers.Authorization = `Bearer ${session.user.accessToken.token}`;
      config.headers['Accept-Language'] = "tr";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosServerInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Refresh işlemi
          const session = await auth();
          const refreshToken = session?.user?.refreshToken.token;

          if (!refreshToken) {
            throw new Error("No refresh token available");
          }

          // Refresh token ile yeni access token almak için API çağrısı
          const refreshResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`, {
            refreshToken,
          });

          const newAccessToken = refreshResponse.data.accessToken;
          const newRefreshToken = refreshResponse.data.refreshToken;

          // Yeni token'ları session'a güncellemek için bir API route'a istekte bulunun
          await updateSessionTokens(newAccessToken, newRefreshToken);

          // Yeniden orijinal isteği yap
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(error.config);
        } catch (refreshError) {
          // Token yenilenemezse, logout yap
          console.log('Token refresh failed, logging out...');
          await signOut({ redirect: false }); // Logout işlemi client-side'da yapılır
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

// Server-side session'ı güncellemek için bir API route fonksiyonu
async function updateSessionTokens(accessToken, refreshToken) {
  // API üzerinden session'ı güncelleme işlemi
  const res = await fetch('/api/auth/update-session', {
    method: 'POST',
    body: JSON.stringify({
      accessToken,
      refreshToken
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!res.ok) {
    throw new Error('Failed to update session tokens');
  }
}

export default axiosServerInstance;
