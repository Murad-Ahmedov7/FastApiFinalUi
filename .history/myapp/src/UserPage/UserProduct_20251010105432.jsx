import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";
import { motion } from "framer-motion";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]); // səbətdəki məhsullar
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ Məhsulun səbətdə olub-olmadığını yoxlamaq
  const isAdded = (productId) => basketItems.some((item) => item.product_id === productId);

  // ✅ Məhsulu səbətə əlavə et
  const handleAddToBasket = async (productId) => {
    try {
      await axios.post(
        `${API_URL}/user/basket/add/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Əlavə olunduqdan sonra səbət məlumatını yenilə
      setBasketItems((prev) => [...prev, { product_id: productId }]);
    } catch (err) {
      console.error("Səbətə əlavə xətası:", err);
    }
  };

  // ✅ Məhsul və səbət məlumatlarını çək
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, basketRes] = await Promise.all([
          axios.get(`${API_URL}/user/products`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${API_URL}/user/basket`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setProducts(productRes.data);
        setBasketItems(basketRes.data);
      } catch (err) {
        console.error("Məlumat çəkilərkən xəta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500" />
      </div>
    );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
      {products.map((product) => {
        const added = isAdded(product.id);

        return (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
          >
            <img
              src={`${API_URL}/images/${product.image_url}`}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
              <p className="text-gray-500 text-sm">{product.description}</p>
              <p className="text-red-600 font-bold text-lg">{product.price} ₼</p>

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => !added && handleAddToBasket(product.id)}
                disabled={added}
                className={`mt-2 py-2 rounded-lg text-white font-medium transition-all duration-500 ${
                  added
                    ? "bg-green-500 cursor-not-allowed"
                    : "bg-gradient-to-r from-red-500 to-red-700 hover:opacity-90"
                }`}
              >
                <motion.span
                  key={added ? "added" : "add"}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {added ? "Added" : "Add to Basket"}
                </motion.span>
              </motion.button>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
