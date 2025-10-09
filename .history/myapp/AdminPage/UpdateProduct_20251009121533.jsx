import { useParams } from "react-router-dom";

export default function UpdateProduct() {
  const { id } = useParams();

  console.log("Product ID:", id);

  return (
    <div>
      <h1>Update Product {id}</h1>
      {/* Burada update formu olacaq */}
    </div>
  );
