import toast from "react-hot-toast";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export const fetchWithToken = (
  url: string,
  method: Method = "GET",
  body?: Record<string, any>
) => {
  try {
    const token = localStorage.getItem("session");
    if (!token) throw new Error("Unauthorized");

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
  }
};
