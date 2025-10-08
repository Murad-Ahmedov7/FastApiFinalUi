import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";

export default function Product() {
    const getToken = localStorage.getItem("token");

    const [prodList, setProdList] = useState([])

    useEffect(async () => {
        const getAllProd = () => {
            const res = axios.get(`${API_URL}/admin/products`)

            const data = res.data

            console.log(data)
        }
        getAllProd()
    }, 
    [])

    if (!getToken) {
        console.log("not found a single token")
    }
    return (
        <div>
            Helllllllllll
        </div>
    )
}