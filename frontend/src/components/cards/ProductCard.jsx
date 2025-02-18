/* eslint-disable react/prop-types */
import { useState } from "react";
import "./productCard.css";

export default function ProductCard(props) {
  const [count, setcount] = useState(0);
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem(`${props.productId}`)
  );

  async function addToWishlist(props) {
    try {
      const dataBody = {};
      dataBody.productId = props.productId;

      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/wishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(dataBody),
        }
      );
      await response.json();
      localStorage.setItem(`${props.productId}`, "checked");
      alert("added to wishlist");
    } catch (error) {
      console.log(error);
    }
  }

  async function removeFromWishlist(props) {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/wishlist/${props.productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      await response.json();
      alert("removed from wishlist");
      localStorage.setItem(`${props.productId}`, "unchecked");
    } catch (error) {
      console.log(error);
    }
  }

  const handleWishlist = (e) => {
    setIsChecked(e.target.checked);
    {
      isChecked ? removeFromWishlist(props) : addToWishlist(props);
    }
  };

  const handleCart = async () => {
    try {
      const dataBody = {};
      dataBody.product_id = props.productId;
      dataBody.quantity = count == 0 ? 1 : count;

      const response = await fetch(
        `${import.meta.env.VITE_APP_BASE_URL}/cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(dataBody),
        }
      );
      await response.json();
      alert(
        `product name: ${props.name}, quantity: ${count} added to the cart`
      );
    } catch (error) {
      console.log(error);
    }
  };

  function incrementCount() {
    let temp = count + 1;
    setcount(temp);
  }

  function decrementCount() {
    let temp = count;
    temp = temp == 0 ? 0 : count - 1;
    setcount(temp);
  }

  return (
    <div className="card">
      <br />
      <img
        src={`${import.meta.env.VITE_APP_HOME_URL}/images/${props.path}`}
        alt="product image"
      />
      <div className="content">
        <p>name: {props.name}</p>
        <p>{props.description}</p>
        <p>price: {props.price}</p>
        <p>items left: {props.stock}</p>
        <br />
        {props.role == "customer" ? (
          <>
            <label>add to wishlist </label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleWishlist}
              id={props.productId}
            />
            <br />
            <br />
            <a onClick={handleCart} style={{ cursor: "pointer" }}>
              add to cart
            </a>
            <div>{count}</div>
            <br />
            <a onClick={incrementCount} style={{ cursor: "pointer" }}>
              click to add
            </a>
            <br />
            <a onClick={decrementCount} style={{ cursor: "pointer" }}>
              click to remove
            </a>
            <br />
          </>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
