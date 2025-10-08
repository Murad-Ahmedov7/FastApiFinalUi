
export default function AddProduct(){
    
        const getToken = localStorage.getItem("token");
    return(
<div className="flex justify-center items-center min-h-screen bg-gray-100">
  <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-4 text-center">Add Product</h2>
    
    <form className="space-y-4">
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Slug</label>
        <input
          type="text"
          placeholder="product-slug"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Unique Stock Code</label>
        <input
          type="text"
          placeholder="ABC123"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Product Description"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block mb-1 font-medium">Price</label>
          <input
            type="number"
            placeholder="100"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Quantity</label>
          <input
            type="number"
            placeholder="10"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <div>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-red-500"
          />
          <span className="ml-2 font-medium">Active</span>
        </label>
      </div>

      <div className="text-right">
        <button
          type="button"
          className="bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 transition"
        >
          Add Product
        </button>
      </div>
    </form>
  </div>
</div>

    )
}