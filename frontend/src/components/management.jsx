import { useNavigate } from "react-router-dom";
import Card from "./cards/card";

export default function Management() {
  const Navigate = useNavigate();

  return (
    <>
      <a href="#" onClick={() => Navigate("/productManagement")}>
        <Card name="product management"></Card>
      </a>
      <a href="#" onClick={() => Navigate("/userManagement")}>
        <Card name="user management"></Card>
      </a>
      <a href="#" onClick={() => Navigate("/orderManagement")}>
        <Card name="order management"></Card>
      </a>
    </>
  );
}
