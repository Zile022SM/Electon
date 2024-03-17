import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name:'cart',
    initialState:{
        cart:[],
        totalProducts:0,
        totalPrice:0,
        currentIndex:0,
        currentProduct:{},
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
             copyArray.push({...action.payload,count:1, subTotal: action.payload.price })
             state.totalProducts++;
             state.totalPrice += action.payload.price;
           }else{
             copyArray[findIndex].count++;
             copyArray[findIndex].subTotal += copyArray[findIndex].price;
             state.totalPrice += copyArray[findIndex].price;
           }

           //kada obradimo kopiju areja onda ga vracamo obradjenog nazad u state.cart
           state.cart = copyArray;
        },

        setPriceIncrementHendler:(state,action)=>{
            //console.log(action.payload);
            //const {increment, index} = action.payload;
            const index = action.payload;
            //console.log(state.cart[index].count); 
            let copyArray = [...state.cart];

            copyArray[index].count +=1;
            copyArray[index].subTotal += copyArray[index].price;
            state.totalPrice += copyArray[index].price;

            state.cart = copyArray;
        },
        setPriceDecrementHendler:(state,action)=>{
            //console.log(action.payload);
            //const {increment, index} = action.payload;
            const index = action.payload;
            //console.log(state.cart[index].count); 
            let copyArray = [...state.cart];
            
            if(copyArray[index].count>1){
                copyArray[index].count -=1;
                copyArray[index].subTotal -= copyArray[index].price;
                state.currentProduct = copyArray[index];
                state.totalPrice -= copyArray[index].price;
            }else{
                state.totalPrice -= copyArray[index].price;
                copyArray.splice(index,1);
                state.currentProduct = {};
                state.totalProducts-=1;
            }
           
            state.cart = copyArray;
        },
        removeProductHendler:(state,action)=>{
            const index = action.payload;
            let copyArray = [...state.cart];
            state.totalPrice -= copyArray[index].subTotal;
            copyArray[index].subTotal = 0;
            copyArray[index].count = 0;
            state.totalProducts -= 1;
            copyArray.splice(index,1);
            state.currentProduct = {};
            state.cart = copyArray;
        },
     
        setCurrentProductHendler:(state,action)=>{

            let copyArray = [...state.cart];

            copyArray.find((item,index)=>{
                if(item.id === action.payload.id){
                    state.currentProduct = item;
                    state.currentIndex = index;
                    return;
                }

            })

        },
        currentIndexHendler:(state,action)=>{
            const index = action.payload;
            state.currentIndex = index;
        }
    }
});

export const {saveInCartHandler,setPriceIncrementHendler,setPriceDecrementHendler,removeProductHendler,setCurrentProductHendler,currentIndexHendler} = cartSlice.actions;
export default cartSlice.reducer;