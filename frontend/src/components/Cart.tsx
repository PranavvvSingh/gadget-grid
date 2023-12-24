import { Rating } from "react-simple-star-rating";
import { phoneType } from "../types/types";
import { useMobileCartContext } from "@/context/ExportContext";
import { useEffect, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { CiShoppingCart } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type responseType = {
  data: phoneType;
};

type propsType = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: propsType) => {
  const navigate= useNavigate()
  const { incItemQuantity, decItemQuantity, removeFromCart } =
    useMobileCartContext();

  const [phone, setPhone] = useState<phoneType>({} as phoneType);
  useEffect(() => {
    const fetchData = async () => {
      const { data }: responseType = await axios.get(
        "https://gadgetsapi-xkx9.onrender.com/products" + "/" + id
      );
      setPhone(data);
    };
    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-3 md:grid-cols-5 md:gap-5 items-center mt-3">
      <div className="flex col-span-2 md:col-span-3">
        <img
          src={phone?.image}
          alt=""
          className="h-[120px] md:h-[150px]  object-contain cursor-pointer"
          onClick={() => navigate("/product/" + id)}
        />
        <div className="flex flex-col justify-between pb-2">
          <div>
            <h1
              className="text-xl md:text-2xl cursor-pointer"
              onClick={() => navigate("/product/" + id)}
            >
              {phone?.name}
            </h1>
            <Rating
              allowFraction
              size={20}
              initialValue={phone?.rating}
              readonly
              style={{
                direction: "ltr",
                fontFamily: "sans-serif",
                touchAction: "none",
              }}
              SVGstyle={{ display: "inline" }}
              className=""
            />
          </div>
          <p className="text-base md:text-lg font-semibold text-neutral-600">
            ${phone?.price}
          </p>
        </div>
      </div>
      <div className="flex justify-center md:gap-3 items-center p-2">
        <div className="flex flex-row h-min w-[100px] md:w-fit gap-2 justify-around border border-neutral-800 p-1">
          <button
            onClick={() => decItemQuantity(id)}
            className="text-base md:text-lg text-neutral-800 px-2 cursor-pointer hover:scale-[1.4] "
          >
            -
          </button>
          <button className="text-base md:text-lg">{quantity}</button>
          <button
            onClick={() => incItemQuantity(id)}
            className="text-base md:text-lg text-neutral-800 px-2 cursor-pointer hover:scale-[1.4] "
          >
            +
          </button>
        </div>
        <MdDeleteOutline
          onClick={() => removeFromCart(id)}
          className="hidden md:block text-3xl text-red-600 cursor-pointer"
        />
      </div>
      <p className="text-end col-span-3 md:text-center md:col-span-1">Subtotal= ${(quantity * phone?.price).toFixed(2)}</p>
    </div>
  );
};

async function fetchPhonePrice(id: number){
  const { data }: responseType = await axios.get(
    "https://gadgetsapi-xkx9.onrender.com/products" + "/" + id
  );
  return data.price
}

const Cart = () => {
  const { cartItems } = useMobileCartContext();
  const [total, setTotal] = useState(0)
  useEffect(()=>{
    setTotal(0)
    async function fetchTotal(){
      for(const item of cartItems){
        const data = await fetchPhonePrice(item.id)
        setTotal(curr=>curr+data*item.quantity)
      }
    }
    fetchTotal()
  },[cartItems])
  return (
    <div className="flex flex-col w-5/6 mx-auto mb-10">
      <div className="text-xl md:text-3xl flex gap-2 justify-center mt-3 mb-3">
        Your Cart <CiShoppingCart className="text-2xl md:text-4xl" />
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 items-center justify-items-center  text-neutral-500">
        <div className="col-span-2 md:col-span-3">PRODUCT</div>
        <div className="hidden md:block">QUANTITY</div>
        <div>TOTAL</div>
      </div>
      <div className="bg-neutral-300 h-[1px] mt-1"></div>
      {cartItems.map((item) => {
        return (
          <CartItem
            key={crypto.randomUUID()}
            id={item.id}
            quantity={item.quantity}
          />
        );
      })}
      <div className="bg-neutral-300 h-[1px] mt-2"></div>
      <h1 className="text-end text-lg md:text-2xl mt-4 md:mx-10">Total = ${total.toFixed(2)}</h1>
    </div>
  );
};

export default Cart;
