import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[]
    },
    reducers:{
        saveInCartHandler:(state,action)=>{
            //console.log(action.payload);
           let copyArray = [...state.cart];
           let findIndex = null;

           //logika je da napravimo kopiju areja cart i da radimo sa kopijom 
           copyArray.find((item,index)=>{
                if(item.id === action.payload.id){
                    findIndex = index;
                    return;
                }
           });

           if(findIndex === null){
            //ovde je logika da prosirujemo objekat koji stize tako sto na postojeci dodamo novi properti count 1 i to pusujemo u kopiju areja
             copyArray.push({...action.payload,count:1})
           }else{
             copyArray[findIndex].count++;
           }

           //kada obradimo kopiju areja onda ga vracamo obradjenog nazad u state.cart
           state.cart = copyArray;
        }
    }
});

export const {saveInCartHandler} = cartSlice.actions;
export default cartSlice.reducer;