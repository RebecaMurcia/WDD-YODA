const baseURL = import.meta.env.VITE_SERVER_URL;

async function convertToJson(res) {
  const json = await res.json();
  if (res.ok) {
    return json;
  } else {
    throw { name: "servicesError", message: json };
  }
}

export async function getProductsByCategory(category) {
  const response = await fetch(baseURL + `products/search/${category}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function findProductById(id) {
  const response = await fetch(baseURL + `product/${id}`);
  const data = await convertToJson(response);
  return data.Result;
}

export async function checkout(payload) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  };

  const response = await fetch(baseURL + "checkout", options);
  return convertToJson(response);
}

export async function loginRequest(creds) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(creds),
  };
  const response = await fetch(baseURL + "login", options);
  const data = await convertToJson(response);
  return data.accessToken;
}

export async function getOrders(token) {
  const options = {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  };
  const response = await fetch(baseURL + "orders", options);
  const data = await convertToJson(response);
  return data;
}