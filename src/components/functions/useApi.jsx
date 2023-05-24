import { useState, useEffect } from "react";

/**
 * Gets the API endpoint with accessToken
 * @param {string} url the url to the API endpoint
 * @param {string} method 'GET'/'POST'/'PUT'/'DELETE'
 * @param {string} token the accessToken
 * @returns { object, boolean, boolean } object from API, 
 * if it's loading and if there's an error.
 * @example
 * ```js
 * // Use this function to get an API endpoint with a url,
 * // method and accessToken.
 * const { data, isLoading, isError } = useApi(
    'https://api.example.com/api/endpoint',
    'GET',
    'accessToken'
  );
 * ```
 */
function useApi(url, method, info) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);
        setIsError(false);

        const token = localStorage.getItem("Token");

        const options = {
          method: method,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(info),
        };

        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
      } catch (error) {
        console.log(error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    }

    getData();
  }, [url, method, info]);
  return { data, isLoading, isError };
}

export default useApi;
