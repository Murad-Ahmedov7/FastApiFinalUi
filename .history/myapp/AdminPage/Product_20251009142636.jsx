import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../baseUrl";
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Sidebar from "./Sidebar";
import { Link, useNavigate } from "react-router-dom";

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
                    id:d.id,
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
       <div className="py-4 flex justify-end mr-4 gap-3">

      <Link
    to="/admin/products/add"
    className="text-white w-full sm:w-auto bg-gradient-to-r from-green-300 via-green-500 to-green-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-md px-5 py-2.5 text-center"
  >
    Add
  </Link>


  <button
    className=" text-white bg-gradient-to-r from-red-300 via-red-500 to-red-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-md px-5 py-2.5 text-center"
    onClick={async () => {
      if (selectionModel.length === 0) {
        alert("Please select at least one product to delete.");
        return;
      }

      const confirmed = window.confirm(
        "Are you sure you want to delete the selected product(s)?"
      );
      if (!confirmed) return;

      try {
        for (let id of selectionModel) {
              console.log("Deleting id:", id); // <- buradan görün ki, id undefined deyil

     await axios.delete(`${API_URL}/admin/products/delete/${id}`, {
            headers: { Authorization: `Bearer ${getToken}` },
          });
        }
        // Silindikdən sonra DataGrid yenilə
        setProdList((prev) => prev.filter((p) => !selectionModel.includes(p.id)));
        setSelectionModel([]);
      } catch (err) {
        console.error("Delete failed:", err);
      }
    }}
  >
    Delete
  </button>
        
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
    let ids = [];

    // newSelection arraydirsə
    if (Array.isArray(newSelection)) {
      ids = newSelection.map((item) => {
        // item ya number/string, ya object ola bilər
        if (typeof item === "object" && item !== null && "id" in item) return item.id;
        return item;
      });
    } else if (typeof newSelection === "object" && newSelection !== null && "id" in newSelection) {
      ids = [newSelection.id];
    } else if (newSelection !== null && newSelection !== undefined) {
      ids = [newSelection];
    }

    // Əmin ol ki, hər element number tipindədir
    ids = ids.map((id) => Number(id)).filter((id) => !isNaN(id));

    setSelectionModel(ids);
  }}
/>
  selectionModel={selectionModel}
      />
    </Paper>

      
        </div>
    )
}

// https://www.figma.com/design/jyubdvrxfVRnE8g9p2lKBZ/Inventory-Management-system--Community-?node-id=0-1&p=f&t=KFa5E6EjObRY37Sc-0