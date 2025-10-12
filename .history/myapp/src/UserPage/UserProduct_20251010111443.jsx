<motion.div
  key={product.id}
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4 }}
  className="bg-gradient-to-br from-red-500 to-black text-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
>
  <div className="w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-96 2xl:h-[28rem] relative">
    <img
      src={
        product.image
          ? product.image
          : product.name === "laptop"
          ? "/images/laptop.png"
          : "https://i02.appmifile.com/976_operatorx_operatorx_opx/23/02/2024/c4866f7bdd20c6ed7acf6082417dd340.png?thumb=1&w=500&q=85"
      }
      alt={product.name}
      className="w-full h-full object-cover"
    />
  </div>

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
