import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";

export default function Product() {
    const getToken = localStorage.getItem("token");

    const [prodList, setProdList] = useState([])

useEffect(() => {
  const getAllProd = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/products`); // burada await
      const data = res.data;
      console.log(data);
    } catch (error) {
      console.error("Xəta baş verdi:", error);
    }
  };

  getAllProd();
}, []);


    }

    if (!getToken) {
        console.log("not found a single token")
    }
    return (
        <div>
            Helllllllllll
        </div>
    )
}