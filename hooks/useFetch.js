import { useState, useEffect } from 'react';

const useFetch = (url, options = {}, trigger = null) => {
  const [data, setData] = useState([]); // Store the fetched data
  const [error, setError] = useState(null); // Store any error that occurs
  const [loading, setLoading] = useState(false); // Indicate loading state



  useEffect(() => {
    console.log("useEffect in useFetch");
    console.log("url here is" , url);
    if (!url) {
      setData(null);
      setLoading(false);
      return;
    }
    // Function to fetch data
    const fetchData = async () => {
      setLoading(true); // Set loading to true at the start
      setError(null); // Reset error
      try {
        console.log("url here is" , url);
        const response = await fetch(url, options); // Fetch the API
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json(); // Parse JSON
        console.log(result.data);
        setData(result.data); // Set the data
      } catch (err) {
        console.log("err here ",err);
        setError(err.message); // Capture error message
        setLoading(false);
      } finally {
        setLoading(false); // Set loading to false at the end
      }
    };

    fetchData(); // Call the fetch function
  }, [url,trigger]); // Re-run the effect if URL or options change

  return { data, error, loading }; // Return data, error, and loading state
};

export default useFetch;
