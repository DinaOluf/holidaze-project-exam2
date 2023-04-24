import { useState, useEffect } from 'react';

function useApi(url) {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
  
    useEffect(() => {
      async function getData() {
        try {
          setIsLoading(true);
          setIsError(false);
          const fetchedData = await fetch(url);
          const json = await fetchedData.json();
          console.log(json); //delete
          setData(json);
        } catch (error) {
          console.log(error);
          setIsError(true);
        } finally {
          setIsLoading(false);
        }
      }
  
      getData();
    }, [url]);
    return { data, isLoading, isError };
  }

  export default useApi;