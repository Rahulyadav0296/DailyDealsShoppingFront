import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

function useFetch({ url, id = null }) {
  const [message, setMessage] = useState("");
  const token = useSelector((state) => state.auth.token); // Access token correctly
  const [results, setResults] = useState(null);

  useEffect(() => {
    if (!token) {
      setMessage("Token is not available");
      return;
    }

    if (!id) {
      setMessage("ID is not provided");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch(`${url}/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json", // Fixed typo
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Response from server is not ok");
        }

        const data = await response.json();
        setResults(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchData();
  }, [url]); // Add dependencies for url, id, and token

  return { message, results };
}

export default useFetch;
