"use client";
export const API_URL =process.env.NEXT_PUBLIC_NODE_ENV === "development" ? process.env.NEXT_PUBLIC_API_URL_DEV : process.env.NEXT_PUBLIC_API_URL;

export const postData = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const getData = async (url: string) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const getDataAuthorization = async (url: string, token: any) => {
 
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const postDataVerify = async (url: string, data: any) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const postDataWithAuth = async (url: string, data: any, token: any) => {
  if(!token){
    window.location.href = "/login";
  } 
   
  const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      credentials: "include",
      body: JSON.stringify(data)
    });
  
    let responseData;
    try {
      responseData = await response.json();
    } catch {
      throw new Error("Invalid JSON response from server");
    }
  
    if (!response.ok) {
      throw new Error(responseData.errors || responseData.message || "Request failed");
    }
  
    return responseData;
  };
  

export const putDataWithAuth = async (url: string, data: any, token: any) => {
  if(!token){
    window.location.href = "/login";
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    credentials: "include",
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};

export const deleteDataWithAuth = async (url: string, token: any) => {
  if(!token){
    window.location.href = "/login";
  }
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    credentials: "include"
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Network response was not ok");
  }
  return response.json();
};
