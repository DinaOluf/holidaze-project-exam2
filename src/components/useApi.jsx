import { useState, useEffect } from 'react';

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
          console.log(json);
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