import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";
import { motion } from "framer-motion";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const isAdded = (productId) =>
    Array.isArray(basketItems) &&
    basketItems.some((item) => item.product_id === productId);

  const handleAddToBasket = async (productId) => {
    try {
      await axios.post(
        `${API_URL}/user/basket/add/${productId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBasketItems((prev) => [...prev, { product_id: productId }]);
    } catch (err) {
      console.error("Səbətə əlavə xətası:", err);
    }
  };

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

        const basketData = Array.isArray(basketRes.data)
          ? basketRes.data
          : basketRes.data.items || [];
        setBasketItems(basketData);
      } catch (err) {
        console.error("Məlumat çəkilərkən xəta:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-500" />
      </div>
    );

  return (
    <div className="relative min-h-screen bg-gray-100 w-full">
      {/* Background */}
      <img
        src="/images/mainuserpage.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      {/* Products Grid */}
      <div className="relative z-10 grid gap-6 p-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => {
          const added = isAdded(product.id);

          return (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-red-500 to-black text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Product Image */}
              <div className="relative w-full h-48 sm:h-56 md:h-60 lg:h-64 xl:h-72 flex-shrink-0">
                <img
                  src={
                    product.image
                      ? product.image
                      : product.name === "laptop"
                      ? "/images/laptop.png"
                      : "https://i02.appmifile.com/976_operatorx_operatorx_opx/23/02/2024/c4866f7bdd20c6ed7acf6082417dd340.png?thumb=1&w=500&q=85"
                  }
                  alt={product.name}
                  className="w-[50%] h- object-cover"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col gap-2 flex-1">
                <h2 className="text-lg font-semibold truncate">{product.name}</h2>
                <p className="text-gray-200 text-sm line-clamp-3">{product.description}</p>
                <p className="font-bold text-lg">{product.price} ₼</p>

                {/* Add to Basket Button */}
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => !added && handleAddToBasket(product.id)}
                  disabled={added}
                  className={`mt-3 py-2 rounded-lg font-semibold transition-all duration-500 ${
                    added
                      ? "bg-green-500 cursor-not-allowed"
                      : "bg-white text-black hover:bg-gray-200"
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
    </div>
  );
}
