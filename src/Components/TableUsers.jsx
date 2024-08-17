import { useEffect, useState } from "react";
import axios from "axios";
import { FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const TableUsers = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/usuario`
        );
        if (Array.isArray(response.data)) {
          setData(response.data);
        } else {
          setError("Response data is not an array");
        }
      } catch {
        setError("Error fetching data");
      }
    }

    fetchData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <h1 className="text-3xl text-center">Examen Pedro Molina Noa</h1>
      <div className="flex justify-center mt-8">
        <table className="table-auto border-collapse border border-gray-300 md:w-1/2">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">ID</th>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Accion</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.name}
                </td>
                <td className="border border-gray-300 px-4 py-2 flex items-center justify-center">
                  <button
                    className="w-full flex items-center justify-center"
                    onClick={() => navigate(`/users/${item.id}`)}
                  >
                    <FaEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableUsers;
