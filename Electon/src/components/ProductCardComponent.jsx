import { Link } from "react-router-dom";
import RatingComponent from "./RatingComponent";
import ButtonComponent from "./ButtonComponent";
import { useDispatch } from "react-redux";
import { saveInCartHandler } from "../store/cartSlice";
import { SlBadge } from "react-icons/sl";

function ProductCardComponent({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="w-[350px] h-[350px] border border-blue-500 rounded-[20px] mt-10 text-center">
      <div className="relative">
        <img
          src={item.thumbnail}
          alt=""
          className="w-full h-[160px] object-cover rounded-t-[20px]"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 rounded-[20px] opacity-0 hover:opacity-80 bg-mainBlue transition-all cursor-pointer items-center justify-center">
          <Link
            to={"/cartProducts"}
            onClick={() => dispatch(saveInCartHandler(item))}
            className="flex items-center justify-center my-[15%]"
          >
            <ButtonComponent
              title={"Add to Cart"}
              color={"mainOrange"}
              text={"white"}
            />
          </Link>
        </div>
        <div className="absolute top-[-40px]  right-0 left-100% right-0 bottom-0">
          <SlBadge size={"85px"} color="orange" />
          <p className="absolute top-4  right-6 left-100% right-0 bottom-0 text-orange-500 text-l font-semibold">
            {Math.floor(item.discountPercentage)} &nbsp;%
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justfy-center my-4">
        <h2 className="text-xl font-bold">{item.title}</h2>
        <span className="text-mainBlue font-bold">${item.price}</span>
        <RatingComponent rating={item.rating} />
        <Link
          to={`/productDetails/${item.id}`}
          className="bg-mainBlue text-white py-2 px-5 rounded-[10px] my-4"
        >
          View detail ...
        </Link>
      </div>
    </div>
  );
}

export default ProductCardComponent;
