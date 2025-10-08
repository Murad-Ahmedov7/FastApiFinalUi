import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Sidebar from "./Sidebar";

export default function Product() {
    const getToken = localStorage.getItem("token");

    const [prodList, setProdList] = useState([
        {
            id:0,
            name: '',
            slug: '',
            uniqueStockCode: '',
            description: '',
            price: 0,
            quantity: 0,
            isActive: false
        },
    ])
    console.log(prodList[0].name)

    const rows = [
        {
            id: 1,
            name: 'Murad',
            slug: 'product-yes',
            uniqueStockCode: "asdad",
            age: 25,
            description: "A product",
            price: 100,
            quantity: 5,
            isActive: true
        },
        {
            id: 2,
            name: 'Ali',
            slug: 'product-no',
            uniqueStockCode: "qwe123",
            age: 30,
            description: "Another product",
            price: 200,
            quantity: 10,
            isActive: false
        },
     
    ];

   

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'slug', headerName: 'Slug', width: 150 },
        { field: 'uniqueStockCode', headerName: 'Stock Code', width: 150 },
        { field: 'description', headerName: 'Description', width: 200 },
        { field: 'price', headerName: 'Price', width: 100 },
        { field: 'quantity', headerName: 'Quantity', width: 100 },
        { field: 'isActive', headerName: 'Active', width: 100 },
    ];

    const paginationModel = { page: 0, pageSize: 5 };

    useEffect(() => {
        const getAllProd = async () => {

            const res = await axios.get(`${API_URL}/admin/products`, {

                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const data = res.data

            console.log(data)
   setProdList(
    data.map(d => ({
        ...d,
        uniqueStockCode: d.unique_stock_code  // backend key fərqlidirsə
    }))
);

        
        }
        getAllProd()
    }, [])

    if (!getToken) {
        console.log("not found a single token")
    }
    return (
        <div className="flex">
            <Sidebar />
            <Paper className="min-h-screen w-full">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{ pagination: { paginationModel } }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                />
            </Paper>

            {/* <div className="border-2 h-40 w-50">
                {
                    prodList.map((p) => (
                        <p className="text-3xl">
                            {p.name}
                        </p>
                    ))
                }
            </div> */}
        </div>
    )
}