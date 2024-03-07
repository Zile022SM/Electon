import React, { useEffect, useState } from "react";
import ProductsService from "../services/productsServices";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsSlice } from "../store/productSlice";
import ProductCardComponent from "../components/ProductCardComponent";
import { FaList } from "react-icons/fa";
import { FiGrid } from "react-icons/fi";

function HomePage() {
  const [activeView, setActiveView] = useState("gridView");

  const dispatch = useDispatch();
  const { allProducts } = useSelector((state) => state.productStore);

  useEffect(() => {
    ProductsService.getAllProducts()
      .then((res) => dispatch(getAllProductsSlice(res.data.products)))
      .catch((err) => toast.warning("Nesto nije ok!"));
  }, []);

  return (
    <div className="container mx-auto">
      <div className="mt-2 flex gap-2 mr-5 mt-4 ittems-center justify-end">
        <FaList
          size="24px"
          color="#003F62"
          onClick={() => setActiveView("listView")}
          style={{
            transform: activeView === "listView" ? "scale(1.5)" : "scale(1)",
            color: activeView === "listView" ? "orange" : "#003F62",
          }}
        />{" "}
        <FiGrid
          size="24px"
          color="#003F62"
          onClick={() => setActiveView("gridView")}
          style={{
            transform: activeView === "gridView" ? "scale(1.5)" : "scale(1)",
            color: activeView === "gridView" ? "orange" : "#003F62",
          }}
        />
      </div>
      {/* Our products/ card */}
      <div className="flex flex-wrap gap-8 items-center justify-center my-8">
        {allProducts.map((item, index) => {
          return <ProductCardComponent key={index} item={item} />;
        })}
      </div>
    </div>
  );
}

export default HomePage;
