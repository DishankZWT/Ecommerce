/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
export default function OrderDetails({ id }) {
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_APP_BASE_URL}/orders/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    })
      .then((response) => response.json())
      .then((orderInfo) => setOrderDetails(orderInfo))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>product id</th>
            <th>price</th>
            <th>quantity</th>
          </tr>
          {orderDetails ? (
            orderDetails.data.order_items.map((element) => {
              return (
                <tr key={element.id}>
                  <td>{element.product.name}</td>
                  <td>{element.price}</td>
                  <td>{element.quantity}</td>
                </tr>
              );
            })
          ) : (
            <tr></tr>
          )}
        </tbody>
        <tfoot></tfoot>
      </table>
    </>
  );
}
