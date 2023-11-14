const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

function getToken() {
  if (typeof window !== "undefined") {
    return sessionStorage.getItem("token");
  }
  return null;
}

function handleResponse(response: Response) {
  if (!response.ok) {
    return response.text().then((text) => {
      let error = new Error(text || `HTTP error! status: ${response.status}`);
      return error;
    });
  }
  if (response.statusText === "No Content") {
    return response.text().then((text) => (text ? JSON.parse(text) : {}));
  } else {
    return response.json().then((data) => ({ status: response.status, data }));
  }
}

function get(path: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${baseURL}${path}`, {
    headers,
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

function post(path: string, data: object) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${baseURL}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

function put(path: string, data: object) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${baseURL}${path}`, {
    method: "PUT",
    headers,
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

function del(path: string) {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  const token = getToken();

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return fetch(`${baseURL}${path}`, {
    method: "DELETE",
    headers,
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}
export { get, post, put, del };
