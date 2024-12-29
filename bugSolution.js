import React, { useEffect, useState } from 'react';

const MyComponent = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  // Check if data is valid before accessing properties
  return (
    <View>
      {data && data.someProperty && (
        <Text>{data.someProperty}</Text>
      )}      
      {!data && <Text>No data available</Text>}
      {data && Array.isArray(data) && data.length === 0 && <Text>No data available</Text>}
    </View>
  );
};

export default MyComponent; 