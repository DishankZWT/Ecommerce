import { useState, useEffect } from "react";
import ChangeStatus from "./changeStatus";

export default function UpdateOrderForm() {
  const [orderData, setOrderData] = useState(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    newData();
  }, []);

  async function newData() {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/allOrders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => response.json())
      .then((orders) => setOrderData(orders))
      .catch((error) => console.error("Error:", error));
  }

  const statusChangeOption = (e) => {
    const input = e.target.attributes.value.value;
    setActive(input);
  };

  return (
    <div>
      {orderData ? (
        orderData.data.map((element) => {
          return (
            <div key={element.id} className="card">
              <p>order: ORDECM{element.id}</p>
              <p>order status: {element.status}</p>
              <p>total price: {element.total_price}</p>
              <br />
              <a
                style={{ cursor: "pointer" }}
                onClick={statusChangeOption}
                value={element.id}
              >
                Change Status
              </a>
              {active == element.id && (
                <ChangeStatus id={element.id} newData={newData} />
              )}
            </div>
          );
        })
      ) : (
        <option value=""></option>
      )}
    </div>
  );
}
