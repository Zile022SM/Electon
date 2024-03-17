
import { useDispatch } from "react-redux";
import {
  currentIndexHendler,
  setCurrentProductHendler,
  removeProductHendler,
  setPriceIncrementHendler,
} from "../store/cartSlice";
import { setPriceDecrementHendler } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";

function CartItemsComponent({ item, index }) {
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-6 place-items-center text-center">
      <div className="flex gap-[10px] items-center flex-col lg:flex-row py-4">
        <Link to={`/productDetails/${item.id}`} onClick={() => {
            dispatch(setCurrentProductHendler(item))
            dispatch(currentIndexHendler(index))
          }}
        >
          <img
            src={item.thumbnail}
            alt=""
            className="w-[70px] h-[70px] rounded-2xl object-cover ml-[-4px]"
          />
        </Link>
      </div>

      <div className="flex flex-col text-center ml-2">
        <h2 className="text-mainBlue font-medium text-[20px]">{item.title}</h2>
        <p className="text-textColor">{item.category}</p>
        <p className="text-textColor">{item.stock}</p>
      </div>

      <div>
        <p>{item.price}</p>
      </div>
      <div className="flex items-center gap-1">
        <button
          className="px-[8px] py-[4px] bg-slate-300 w-[30px]"
          onClick={() => dispatch(setPriceDecrementHendler(index))}
        >
          -
        </button>
        <span className="px-[8px] py-[4px] bg-gray-300 w-[40px] text-center">
          {item.count}
        </span>
        <button
          className="px-[8px] py-[4px] bg-slate-300 w-[30px]"
          onClick={() => dispatch(setPriceIncrementHendler(index))}
        >
          +
        </button>
      </div>

      <div className="flex items-center justify-center text-center gap-2">
        <p className="pl-7">{item.subTotal}</p>
      </div>
      <div>
        <FaTrashCan size="20px"
          color="red"
          onClick={() => dispatch(removeProductHendler(index))}
          className="cursor-pointer"/>
      </div>
    </div>
  );
}

export default CartItemsComponent;
