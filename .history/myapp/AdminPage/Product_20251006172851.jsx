import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";

export default function Product(){
     const getToken=localStorage.getItem("token");

     const[prodList,setProdList]=useState([])

    useEffect(()=>{
        const res=axios.get(`${API_URL}admin/products`)

        
    })

     if(!getToken){
        console.log("not found a single token")
     }
    return(
        <div>
            Helllllllllll
        </div>
    )
}