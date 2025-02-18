import { useState } from "react";
import Card from "../cards/card";
import UpdateOrderForm from "../adminControl/updateOrderForm";

export default function OrderManagement() {
  const [activeForm, setActiveForm] = useState(null);

  const handleLinkClick = (formType) => {
    setActiveForm(formType);
  };
  return (
    <>
      <a href="#" onClick={() => handleLinkClick("updateOrder")}>
        <Card name="update order"></Card>
      </a>
      <div>{activeForm === "updateOrder" && <UpdateOrderForm />}</div>
    </>
  );
}
