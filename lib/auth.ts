// import api from "./axiosAuth";
// import { setAccessToken, clearAccessToken } from "./token";

// export const login = async (email: string, password: string) => {
//     const res = await api.post("/login", {email, password})
//     setAccessToken(res.data.accessToken)
//     return res.data
// }

// export const register = async(name: string, email: string, password: string) => {
//     const res = await api.post("/register", {name, email, password})
//     return res.data
// }

// export const logout = async() => {
//     clearAccessToken();
//     await api.post("/logout")
// }