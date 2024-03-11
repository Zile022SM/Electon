import { Link } from "react-router-dom";
import RatingComponent from "./RatingComponent";
import ButtonComponent from "./ButtonComponent";
import { useDispatch } from "react-redux";
import { currentIndexHendler, saveInCartHandler } from "../store/cartSlice";
import { MdDiscount } from "react-icons/md";

function ProductCardComponent({ item,index, activeView}) {
  const dispatch = useDispatch();

  return (
    <div className={activeView === "gridView" ? "w-[350px] h-[350px] border border-blue-500 rounded-[20px] mt-10 text-center" : "w-[500px] h-[350px] border border-blue-500 rounded-[20px] mt-10 text-center"}>
      <div className="relative">
        <img
          src={item.thumbnail}
          alt=""
          className="w-full h-[160px] object-cover rounded-t-[20px]"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[20px] opacity-0 hover:opacity-90 bg-mainBlue transition-all cursor-pointer items-center justify-center">
          <Link
            to={"/cartProducts"}
            onClick={() => dispatch(saveInCartHandler(item))}
            className={activeView === "gridView" ? "flex items-center justify-center my-[25%]" : "flex items-center justify-center my-[15%]"}
          >
            <ButtonComponent
              title={"Add to Cart"}
              color={"mainOrange"}
              text={"white"}
            />
          </Link>
        </div>
        <div className="absolute top-1  right-0 left-100% right-0 bottom-0">
          <MdDiscount size={"70px"} color="orange" />
          <p className="absolute top-4  right-4 left-100% right-0 bottom-0 text-white text-l font-extrabold">
            {Math.floor(item.discountPercentage)}%
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justfy-center my-4">
        <h2 className="text-xl font-bold">{item.title.substring(0, 30)}</h2>
        <span className="text-mainBlue font-bold">${item.price}</span>
        <RatingComponent rating={item.rating} />
        <Link to={`/productDetails/${item.id}`}
          className="bg-mainBlue text-white py-2 px-5 rounded-[10px] my-4" onClick={() => dispatch(currentIndexHendler(index))}
        >
          View details...
        </Link>
      </div>
    </div>
  );
}

export default ProductCardComponent;
