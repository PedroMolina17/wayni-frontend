import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/usuario`
        );
        console.log("API response:", response.data);
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
          setError("Response data is not an array");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col">
      {data.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.username}</p>
          <p>{item.email}</p>
          <p>{item.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
