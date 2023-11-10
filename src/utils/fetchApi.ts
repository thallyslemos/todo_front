const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
  return fetch(`${baseURL}${path}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => console.error(error));
}

function post(path: string, data: object) {
  return fetch(`${baseURL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

function put(path: string, data: object) {
  console.error(data);
  return fetch(`${baseURL}${path}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

function del(path: string) {
  return fetch(`${baseURL}${path}`, {
    method: "DELETE",
  })
    .then(handleResponse)
    .catch((error) => console.error(error));
}

export { get, post, put, del };
