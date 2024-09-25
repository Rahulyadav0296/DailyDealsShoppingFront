import { useState } from "react";

function usePostRequest() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const postRequest = (url, data, token = null) => {
    setLoading(true);
    setMessage(null);

    return new Promise((resolve, reject) => {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error!, Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          console.error("Error: ", err);
          setMessage(err.message);
          reject(err);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  };

  return { postRequest, message, loading };
}

export default usePostRequest;
