import toast from "react-hot-toast";
import { refreshToken } from "./auth";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type FetchOptions = {
  method: Method;
  body?: Record<string, any>;
};

export const fetchWithToken = async (
  url: string,
  { method = "GET", body }: FetchOptions
) => {
  try {
    const token = localStorage.getItem("session");
    if (!token) throw new Error("Unauthorized 1");

    // const refreshedToken = await refreshToken(token);

    // if (!refreshedToken) throw new Error("Unauthorized 2");

    if (!body) {
      return fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    error instanceof Error && toast.error(error.message);
    return null;
  }
};
