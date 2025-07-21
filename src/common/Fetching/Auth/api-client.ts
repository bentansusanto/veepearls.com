// import Cookies from "js-cookie";
// import { API_URL } from "../ApiConfig";

// let refreshTokenTimeout: NodeJS.Timeout;

// export async function fetchWithAuth(url: string, options: RequestInit = {}) {
//   const accessToken = Cookies.get("session_veepearl");

//   // Setup refresh token timer when a new token is received
//   if (accessToken && !refreshTokenTimeout) {
//     setupRefreshTokenTimer();
//   }

//   const defaultHeaders = {
//     "Content-Type": "application/json",
//     Authorization: accessToken ? `Bearer ${accessToken}` : "",
//   };

//   options.headers = { ...defaultHeaders, ...options.headers };
//   options.credentials = "include";

//   let response = await fetch(`${API_URL}${url}`, options);

//   if (response.status === 401) {
//     const refreshed = await refreshAccessToken();
//     if (refreshed) {
//       options.headers = {
//         ...options.headers,
//         Authorization: `Bearer ${Cookies.get("session_veepearl")}`,
//       };
//       response = await fetch(`${API_URL}${url}`, options);
//     }
//   }

//   return response;
// }

// function setupRefreshTokenTimer() {
//   // Clear any existing timer
//   if (refreshTokenTimeout) {
//     clearTimeout(refreshTokenTimeout);
//   }

//   // Set new timer for 60 minutes
//   refreshTokenTimeout = setTimeout(async () => {
//     await refreshAccessToken();
//   }, 60 * 60 * 1000); // 60 minutes in milliseconds
// }

// async function refreshAccessToken(): Promise<boolean> {
//   try {
//     const response = await fetch(`${API_URL}/auth/refresh_token`, {
//       method: "POST",
//       credentials: "include",
//     });

//     if (!response.ok) {
//       clearTimeout(refreshTokenTimeout);
//       Cookies.remove("session_veepearl");
//       window.location.href = "/login";
//       return false;
//     }

//     const data = await response.json();
//     Cookies.set("session_veepearl", data.accessToken, { secure: true, sameSite: "strict" });
    
//     // Setup next refresh cycle
//     setupRefreshTokenTimer();
//     return true;
//   } catch (error) {
//     clearTimeout(refreshTokenTimeout);
//     return false;
//   }
// }
