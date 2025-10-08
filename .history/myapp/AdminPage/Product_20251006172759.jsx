import axios from "axios";
import { useEffect, useState } from "react";

export default function Product(){
     const getToken=localStorage.getItem("token");

     const[prodList,setProdList]=useState([])

    useEffect(()=>{
        axios.get("http://127.0.0.1:8000/api/admin/products/")
        
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