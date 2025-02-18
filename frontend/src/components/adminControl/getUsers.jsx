import "./form.css";
import { useEffect, useState } from "react";

export default function GetAllUsersForm() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((categories) => setData(categories))
      .catch((error) => console.error("Error:", error));
  }, [token]);

  return (
    <>
      <h3>All Users</h3>
      <div className="cardDiv">
        {data ? (
          data.getList.map((element) => {
            return (
              <div key={`${element.id}`} className="userCard">
                <p>first name: {element.first_name}</p>
                <p>last name: {element.last_name}</p>
                <p>email: {element.email}</p>
                <p>role: {element.role}</p>
              </div>
            );
          })
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
