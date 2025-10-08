export default function AddNewProduct() {
  const getToken = localStorage.getItem("token");

  return (
    <div className="max-w-2xl w-full mx-auto my-10 p-6 bg-white shadow-lg rounded-lg flex flex-col">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Product</h2>

      <form className="w-full space-y-4">
        <input
          type="text"
          placeholder="Product Name"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="text"
          placeholder="Slug"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <input
          type="text"
          placeholder="Unique Stock Code"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        <textarea
          placeholder="Product Description"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            placeholder="Price"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="number"
            placeholder="Quantity"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        <label className="inline-flex items-center">
          <input
            type="checkbox"
            className="form-checkbox text-red-500"
          />
          <span className="ml-2 font-medium">Active</span>
        </label>

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
  );
}
