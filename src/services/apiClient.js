const BASE_URL = 'https://backend-przone.onrender.com'; 

export default async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
    credentials: 'include',
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    let data;
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.includes('application/json')) {
      data = await response.json();

    } else if (response.status === 200 && !contentType) {
      data = { success: true, message: response.statusText || 'Operation successful' };

    } else {
      data = { success: false, message: `Unexpected content type: ${contentType} or no content for status ${response.status}` };
    }

    if (response.ok) {
      return data;

    } else {
      const error = {
        status: response.status,
        message: data?.message || response.statusText || 'An error occurred',
        ...(data?.errors && { errors: data.errors }),
      };
      
      return Promise.reject(error);
    }
  } catch (err) {
    console.error('API Client Error:', err);

    const networkError = {
      message: err.message || 'Network error or API client failed',
      isNetworkError: true,
    };

    return Promise.reject(networkError);
  }
}
