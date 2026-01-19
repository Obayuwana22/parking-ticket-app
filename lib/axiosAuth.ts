import api from "./axios";
import { getAccessToken, setAccessToken, clearAccessToken } from "./token";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};

// 🔐 Request interceptor → attach access token
api.interceptors.request.use(config => {
  const token = getAccessToken();

  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔁 Response interceptor → refresh on 401
api.interceptors.response.use(
  response => response,
  async error => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return api(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await api.post("/refresh");
        setAccessToken(res.data.accessToken);

        processQueue(null, res.data.accessToken);

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`;

        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);
        clearAccessToken();
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
