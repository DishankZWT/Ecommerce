import { useState } from "react";
import Card from "../cards/card";
import GetAllUsersForm from "../adminControl/getUsers";

export default function UserManagement() {
  const [activeForm, setActiveForm] = useState(null);

  const handleLinkClick = (formType) => {
    setActiveForm(formType);
  };

  return (
    <>
      <a href="#" onClick={() => handleLinkClick("users")}>
        <Card name="get users"></Card>
      </a>
      <div>{activeForm === "users" && <GetAllUsersForm />}</div>
    </>
  );
}
