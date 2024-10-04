import { useState } from "react";

function usePostRequest() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const postRequest = async (url, data, token = null) => {
    setLoading(true);
    setMessage(null);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify(data),
      });

      // Check if the response is OK (i.e., status code 2xx)
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const result = await response.json();
      return result;
    } catch (err) {
      console.error("Error: ", err.message);
      setMessage(err.message || "Something went wrong. Please try again.");
      throw err; // Propagate the error to the calling component
    } finally {
      setLoading(false);
    }
  };

  return { postRequest, message, loading };
}

export default usePostRequest;
