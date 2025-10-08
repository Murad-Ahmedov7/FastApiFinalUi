import axios from "axios";
import { useEffect, useState } from "react";

export default function Product(){
     const getToken=localStorage.getItem("token");

     const[prodList,setProdList]=useState([])

    useEffect(()=>{
        axios.get(`admin/products/")
        
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