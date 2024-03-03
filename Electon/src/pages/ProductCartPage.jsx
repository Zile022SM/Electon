import { useSelector } from "react-redux";

function ProductCartPage() {

    const {cart} = useSelector(state=>state.cartStore);

    console.log(cart);
  return (
    <div>
      ProductCartPage
    </div>
  );
}

export default ProductCartPage;