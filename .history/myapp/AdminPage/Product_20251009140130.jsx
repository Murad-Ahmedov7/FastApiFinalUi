import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

export default function Product() {
    const getToken = localStorage.getItem("token");
    const navigate = useNavigate();
    const [selectionModel, setSelectionModel] = useState([]);


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
    // console.log(prodList[0].name)

    const rows=prodList

   

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
                    Authorization: `Bearer ${ getToken}`
                }
            });
            const data = res.data

            console.log(data)
            setProdList(
                data.map(d => ({
                    ...d,
                    uniqueStockCode: d.unique_stock_code,
                    isActive:d.is_active
                }))
            );

        
        }
        getAllProd()
    }, [])

    if (!getToken) {
        console.log("not found a single token")
    }
    return (
        <div>
       <div className="mb-4 flex justify-end mr-4 gap-3">

        <Link   to='/admin/products/add' className="text-white w-30   bg-gradient-to-r from-red-300 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center mt-3">
          Add
        </Link>
         {/* Delete düyməsi */}
  <Button
  className="h-10 pt-22"
    variant="contained"
    color="error"
    onClick={async () => {
      if (selectionModel.length === 0) {
        alert("Please select at least one product to delete.");
        return;
      }

      const confirmed = window.confirm("Are you sure you want to delete the selected product(s)?");
      if (!confirmed) return;

      try {
        for (let id of selectionModel) {
          await axios.delete(`${API_URL}/delete/${id}`, {
            headers: { Authorization: `Bearer ${getToken}` }
          });
        }
        // Silindikdən sonra DataGrid yenilə
        setProdList(prev => prev.filter(p => !selectionModel.includes(p.id)));
        setSelectionModel([]);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }}
  >
    Delete
  </Button>
        
      </div>
   <Paper className="min-h-screen w-[80vw]">
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        onRowClick={(params) => {
           navigate(`/admin/products/update/${params.row.id}`, { state: params.row });
        }}
          onRowSelectionModelChange={(newSelection) => {
    setSelectionModel(newSelection);
  }}
  selectionModel={selectionModel}
      />
    </Paper>

      
        </div>
    )
}

// https://www.figma.com/design/jyubdvrxfVRnE8g9p2lKBZ/Inventory-Management-system--Community-?node-id=0-1&p=f&t=KFa5E6EjObRY37Sc-0