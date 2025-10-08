import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";

export default function Product(){
     const getToken=localStorage.getItem("token");

     const[prodList,setProdList]=useState([])

    useEffect(async()=>{
     

        
    },[])

     if(!getToken){
        console.log("not found a single token")
     }
    return(
        <div>
            Helllllllllll
        </div>
    )
}