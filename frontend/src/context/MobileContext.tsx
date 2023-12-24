import { cardType} from "@/types/types";
import { ReactNode, createContext,  useState } from "react";

type typeMobileCartProvider = {
  children: ReactNode;
};
type cartItemsType={
  id: number,
  quantity: number
}
type typeMobileCartContext = {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  cartTotal: number;
  setCartTotal: React.Dispatch<React.SetStateAction<number>>;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  memory: string;
  setMemory: React.Dispatch<React.SetStateAction<string>>;
  os: string;
  setOs: React.Dispatch<React.SetStateAction<string>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  favorites: cardType[];
  setFavorites: React.Dispatch<React.SetStateAction<cardType[]>>;
  addToFav: (phone: cardType) => void;
  removeFromFav: (id: number) => void;
  getItemQuantity: (id: number) => number;
  incItemQuantity: (id: number) => void;
  decItemQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: () => number;
  cartItems: cartItemsType[];
};

export const MobileCartContext = createContext({} as typeMobileCartContext);

export function MobileCartProvider({ children }: typeMobileCartProvider) {
  const [search, setSearch] = useState("")
  const [price, setPrice] = useState("Price");
  const [memory, setMemory] = useState("Memory");
  const [os, setOs] = useState("OS");
  const [sort, setSort] = useState("Sort By");

  const [cartTotal, setCartTotal] = useState(0)

  const [favorites, setFavorites] = useState<cardType[]>([]);
  const addToFav = (phone: cardType) => {
    setFavorites((curr) => [...curr, phone]);
  };
  const removeFromFav = (id: number) => {
    setFavorites((curr) => curr.filter((item) => item.id !== id));
  };

  const [cartItems, setCartItems] = useState<cartItemsType[]>([])
  const getItemQuantity = (id:number) =>{
    return cartItems.find(item=>item.id===id)?.quantity || 0;
  }
  const incItemQuantity = (id:number) =>{
    setCartItems(currItems=>{
      if(currItems.find((item)=>item.id===id)==null){
        return [...currItems, {id, quantity:1}]
      }
      else{
        return currItems.map((item)=>{
          if(item.id===id){
            return {...item, quantity: item.quantity+1}
          }
          else return item
        })
      }
    })
  }
  const decItemQuantity = (id: number) => {
    setCartItems((currItems) => {
      if (currItems.find((item) => item.id === id)?.quantity === 1) {
        return currItems.filter(item=>item.id!==id);
      } else {
        return currItems.map((item) => {
          if (item.id === id) {
            return { ...item, quantity: item.quantity - 1 };
          } else return item;
        });
      }
    });
  };
  const removeFromCart = (id:number) => {
    setCartItems((currItems)=>{
      return currItems.filter(item=>item.id!==id)
    })
  }
  const cartQuantity = () =>{
    return cartItems.reduce((quantity,item)=>item.quantity+quantity,0)
  }

  return (
    <MobileCartContext.Provider
      value={{
        search,
        setSearch,
        cartTotal,
        setCartTotal,
        cartItems,
        cartQuantity,
        getItemQuantity,
        incItemQuantity,
        decItemQuantity,
        removeFromCart,
        sort,
        setSort,
        price,
        setPrice,
        memory,
        setMemory,
        os,
        setOs,
        favorites,
        setFavorites,
        addToFav,
        removeFromFav
      }}
    >
      {children}
    </MobileCartContext.Provider>
  );
}
