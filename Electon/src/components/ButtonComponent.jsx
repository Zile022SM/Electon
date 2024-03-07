import { TiShoppingCart } from "react-icons/ti";

function ButtonComponent({ title, color, text }) {
  return (
    <>
      <button
        type="submit"
        className={`bg-${color} text-${text} py-1 px-6 rounded-[20px] my-2 hover:opacity-100 flex items-center gap-3 text-xl`}
      >
        {title}
        <TiShoppingCart
          size="35px"
          style={{
            borderRadius: "20px",
            padding: "5px",
            marginLeft: "-10px",
          }}
        />
      </button>
    </>
  );
}

export default ButtonComponent;
