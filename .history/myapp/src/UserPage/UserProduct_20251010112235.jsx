import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../../baseUrl";
import { motion } from "framer-motion";

export default function UserProduct() {
  const [products, setProducts] = useState([]);
  const [basketItems, setBasketItems] = useState([]); 
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  // ✅ Məhsulun səbətdə olub-olmadığını yoxlamaq
  const isAdded = (productId) =>
    Array.isArray(basketItems) &&
    basketItems.some((item) => item.product_id === productId);

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

        // bəzi backend-lər "items" içində göndərir
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
    <div className="relative h-screen bg-gray-100 w-screen overflow-y-auto">
      <img
        src="/images/mainuserpage.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover z-0"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-0"></div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-8">
        {products.map((product) => {
          const added = isAdded(product.id);

          return (
              <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-red-500 to-black text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between pt-7 md:mx-2 "
            >
          <img 
                  src={
                    product.image
                      ? product.image
                      : product.name === "laptop"
                      ? "/images/laptop.png"
                      : "https://i02.appmifile.com/976_operatorx_operatorx_opx/23/02/2024/c4866f7bdd20c6ed7acf6082417dd340.png?thumb=1&w=500&q=85"
                  }
                alt={product.name}
                className="xl:w-full xl:h-60 md:w-[100%] md:h-50 object-cover"
              />

              <div className="p-4 flex flex-col gap-2">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-gray-200 text-sm line-clamp-3">{product.description}</p>
                <p className="font-bold text-lg">{product.price} ₼</p>

                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => !added && handleAddToBasket(product.id)}
                  disabled={added}
                  className={`mt-2 py-2 rounded-lg font-semibold transition-all duration-500 ${
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
