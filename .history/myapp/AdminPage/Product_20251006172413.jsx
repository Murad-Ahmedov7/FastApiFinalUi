import axios from "axios";
import { useEffect } from "react";

export default function Product(){
     const getToken=localStorage.getItem("token");

    useEffect(()=>{
        axios.get("")
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