import axios from "axios";
import { useEffect } from "react";

export default function Product(){
     const getToken=localStorage.getItem("token");

     const prodList=use

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