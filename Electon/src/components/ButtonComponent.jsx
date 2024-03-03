function ButtonComponent({ title, color, text }) {
    return (
    <>
       <button type="submit" className={`bg-${color} text-${text} py-2 px-5 rounded-[20px] my-2 hover:opacity-90`}>
        {title}
         </button>
    </>
    
    );
  }
  
  export default ButtonComponent;
  