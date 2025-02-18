/* eslint-disable react/prop-types */
import { useState } from "react";

export default function ChangeStatus({ id, newData }) {
  const [status, setStatus] = useState("");

  function handleChange(e) {
    const input = e.target.value;
    setStatus(input);
  }

  const handleUpdate = async () => {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/orders/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
      body: JSON.stringify({ status }),
    })
      .then((response) => {
        response.json();
        newData();
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <select id={id} onChange={handleChange}>
        <option value="">Change Status</option>
        <option value="pending">Pending</option>
        <option value="shipped">Shipped</option>
        <option value="delivered">Delivered</option>
        <option value="canceled">Cancelled</option>
      </select>
      <a onClick={handleUpdate}>Update Status</a>
    </>
  );
}
