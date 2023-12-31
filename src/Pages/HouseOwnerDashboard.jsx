import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import DeleteHouseModal from "../components/DeleteHouseModal";
import OwnerHouseCard from "../components/OwnerHouseCard";

const HouseOwnerDashboard = () => {
  const [houses, setHouses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHouseId, setSelectedHouseId] = useState(null);

  const token = localStorage.getItem("jwtToken");
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/user/houses`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setHouses(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      await axios.delete(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/user/houses/${selectedHouseId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setHouses((prevHouses) =>
        prevHouses.filter((house) => house._id !== selectedHouseId)
      );
      setSelectedHouseId(null);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-16 min-h-screen max-w-6xl mx-auto">
      <h2 className="text-2xl text-accent text-center font-bold">
        Welcome back, {decodedToken.name}
      </h2>
      <p className="text-center text-accent">{decodedToken.email}</p>
      <p className="text-center text-accent">
        Your role is a {decodedToken.role}
      </p>
      <div className="flex justify-center my-10">
        <Button
          placeholder="Add a New House"
          href="/owner/dashboard/add-house"
        />
      </div>

      {houses.length === 0 ? (
        <div className="mt-4 text-center text-gray-500">
          You have no houses listed. Please add one.
        </div>
      ) : (
        <div className="overflow-x-auto mt-16">
          <table className="table-fixed w-full border-collapse rounded-md">
            <thead className="bg-dark text-light text-left">
              <tr>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Uploaded Date</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody className="">
              {houses.map((house) => (
              <OwnerHouseCard key={house._id} house={house} setSelectedHouseId={setSelectedHouseId}/>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <DeleteHouseModal
        houseId={selectedHouseId}
        onCancel={() => setSelectedHouseId(null)}
        onDelete={handleDelete}
        setSelectedHouseId={setSelectedHouseId}
      />
    </div>
  );
};

export default HouseOwnerDashboard;
