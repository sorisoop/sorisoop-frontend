const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const refreshAccessToken = async (): Promise<boolean> => {
  try {
    const res = await fetch(`${API_BASE_URL}/auth/refresh-token`, {
      method: "POST",
      credentials: "include",
    });

    const data = await res.json();
    return res.ok && data?.code === "AU100";
  } catch {
    return false;
  }
};
