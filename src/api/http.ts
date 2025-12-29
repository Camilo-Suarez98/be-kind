const BASE_HEADERS = {
  'Content-Type': 'application/json'
};

export async function http<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem('token');
  const response = await fetch(url, {
    ...options,
    headers: {
      ...BASE_HEADERS,
      ...(token && { Authorization: `Bearer ${token}` })
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw error;
  }

  return response.json();
};
