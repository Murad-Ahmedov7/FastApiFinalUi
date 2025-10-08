import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";

export default function Product() {
    const getToken = localStorage.getItem("token");

    const [prodList, setProdList] = useState([])

    const rows = [
        { id: 1, name: 'Murad', age: 25 },
        { id: 2, name: 'Ali', age: 30 },
    ];

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'name', headerName: 'Ad', width: 200 },
        { field: 'age', headerName: 'Yaş', width: 150 },
    ];


    const paginationModel = { page: 0, pageSize: 5 };


    //     useEffect(() => {
    //         const getAllProd =async () => {

    // const res = await axios.get(`${API_URL}/admin/products`, {
    //   headers: {
    //     Authorization: `Bearer ${localStorage.getItem("token")}`
    //   }
    // });
    //             const data = res.data

    //             console.log(data)
    //         }
    //         getAllProd()
    //     }, [])

    if (!getToken) {
        console.log("not found a single token")
    }
    return (
      <Paper sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
    )
}