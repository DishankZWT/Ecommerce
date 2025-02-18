import { useState } from "react";
import Card from "../cards/card";
import UpdateProductForm from "./updateProduct";
import DeleteProductForm from "./deleteProduct";
import AddProductForm from "./createProduct";
import AddCategoryForm from "./createCategory";

export default function ProductManagement() {
  const [activeForm, setActiveForm] = useState(null);

  const handleLinkClick = (formType) => {
    setActiveForm(formType);
  };

  return (
    <>
      <a href="#" onClick={() => handleLinkClick("updateProduct")}>
        <Card name="update product"></Card>
      </a>
      <a href="#" onClick={() => handleLinkClick("deleteProduct")}>
        <Card name="delete product"></Card>
      </a>
      <a href="#" onClick={() => handleLinkClick("product")}>
        <Card name="create product"></Card>
      </a>
      <a href="#" onClick={() => handleLinkClick("category")}>
        <Card name="create category"></Card>
      </a>
      <div>
        {activeForm === "updateProduct" && <UpdateProductForm />}
        {activeForm === "deleteProduct" && <DeleteProductForm />}
        {activeForm === "product" && <AddProductForm />}
        {activeForm === "category" && <AddCategoryForm />}
      </div>
    </>
  );
}
