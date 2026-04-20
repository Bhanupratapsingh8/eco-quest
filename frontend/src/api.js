// Base URL of your deployed backend
const BASE_URL = "https://eco-quest-backend-mh98.onrender.com";

// =====================
// GET REQUEST
// =====================
export const getData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("GET API Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// =====================
// POST REQUEST
// =====================
export const postData = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST API Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// =====================
// PUT REQUEST
// =====================
export const putData = async (endpoint, body) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("PUT API Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};

// =====================
// DELETE REQUEST
// =====================
export const deleteData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("DELETE API Error:", error);
    return { success: false, message: "Something went wrong" };
  }
};