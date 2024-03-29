import { useSelector } from "react-redux";
import CartItemsComponent from "../components/CartItemsComponent";
import countries from "../constants/country";

function ProductCartPage() {

    const {cart, totalPrice} = useSelector(state=>state.cartStore);

  return (
    <div className="mt-[20px] lg:mt-[50px]">
      <div className="container mx-auto flex flex-col lg:flex-row lg:gap-5">
        {/* left side */}
        <div className="w-full lg:w-[70%]">
            {/* cart head */}
            <div className='grid grid-cols-6 bg-[#AFEEEE] h-[50px] place-items-center text-center mb-[20px]'>
                <p>Image</p>
                <p>Product</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Subtotal</p>
                <p>Remove</p>
            </div>

            {/* body/content of items */}
            <div className="flex flex-col gap-1">
                {cart.map((item,index)=>{
                    return <CartItemsComponent key={index} index={index} item={item} />
                })}
            </div>

        </div>
        {/* right side */}
        <div className="w-full lg:w-[30%] border border-slate-400">
                {/* headuing title */}
                <div className="h-[50px] bg-[#AFEEEE] flex items-center justify-center text-center">
                    Cart Total
                </div>
                {/* content */}

                <div className="flex items-center justify-center my-[15px] px-[10px] border-b border-slate-400 text-center w-[90%] mx-auto">
                    <span className="mb-2">{totalPrice}</span>
                </div>
                <div className="my-12 flex flex-col items-center w-[90%] mx-auto border-b border-slate-400 pb-[30px] mt-[20px]">
                    <p className="my-2"> Take your discount 50%</p>
                    <div className="flex items-center justify-start w-[90%]">
                        <input type="text" className="border border-slate-500 rounded-full  px-[8px] py-[4px] outline-none my-3 w-full" name="discount" placeholder="Apply coupon" id="" />
                        <button className="bg-mainBlue px-[15px] py-[4px] rounded-full mx-[-70px] text-white">Apply</button>
                    </div>
                </div>

                <div className="my-1 text-center">
                        <select name="" id="" className="w-[80%] h-[35px] px-[8px] py-[4px] border border-slate-500 rounded-full bg-textWhite mx-auto">
                            <option> -- Select country --</option>
                            {countries.map((el,index)=>{
                                return <option key={index}>{el.name}</option>
                            })}
                        </select>

                        <button className="bg-mainOrange text-white my-9 px-[50px] py-[5px] rounded-[15px]  text-center w-[80%] h-[35px]">Proceed to checkout</button>
                </div>
                
        </div>
      </div>
    </div>
  );
}

export default ProductCartPage;