import { useEffect, useState } from "react";
import { phoneType } from "@/types/types";
import axios from "axios";
import { useParams } from "react-router-dom";
import { IoStar } from "react-icons/io5";
import { useMobileCartContext } from "@/context/ExportContext";

const Phone = () => {
  const { incItemQuantity, decItemQuantity, getItemQuantity } =
    useMobileCartContext();
  const [phone, setPhone] = useState<phoneType>({} as phoneType);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        "https://gadgetsapi-xkx9.onrender.com/products" + "/" + id
      );
      setPhone(data);
    };
    fetchData();
  }, [id]);
  const quantity = getItemQuantity(phone.id);
  return (
    <div className="w-5/6 mx-auto flex flex-col md:flex-row pt-10 pb-10 items-center justify-center gap-5 ">
      <img src={phone?.image} alt="" className="h-[200px] w-[200px] md:h-[400px] md:w-[400px]" />
      <div className="flex flex-col gap-4 h-[400px]">
        <div>
          <div className="flex items-end gap-2">
            <h1 className="text-2xl md:text-3xl ">{phone?.name}</h1>
            <p className="h-min flex items-center gap-1 text-xs md:text-sm bg-green-700 px-[5px] py-[2px] rounded-lg text-white mb-1 tracking-wider">
              <span></span>
              {phone?.rating} <IoStar className="text-yellow-400" />
            </p>
          </div>
          <div className="mt-1 border-[1px]"></div>
        </div>
        <p className="text-xl md:text-2xl font-semibold">
          ${phone?.price}{" "}
          <span className="text-sm md:text-base font-normal text-neutral-400">
            Inclusive of all taxes
          </span>
        </p>
        <p className="md:text-lg">{phone?.description}</p>
        <ul className="list-disc list-inside md:text-lg">
          <li>{phone?.processor}</li>
          <li>{phone?.memory} GB Memory</li>
          <li>{phone?.battery} mAh Battery</li>
          <li>{phone?.warranty} Years Warranty</li>
          <li>{phone?.OS}</li>
        </ul>
        {quantity === 0 ? (
          <button
            className="border-2 border-black rounded-full mt-2 hover:text-white hover:bg-neutral-800 py-2 max-w-[400px]"
            onClick={() => incItemQuantity(phone?.id)}
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex justify-around mt-2 items-center  max-w-[250px]">
            <p className="md:text-xl">In Cart : </p>
            <button
              onClick={() => decItemQuantity(phone?.id)}
              className="md:text-lg text-neutral-800 rounded-xl px-2 cursor-pointer border hover:text-white hover:bg-neutral-800 "
            >
              -
            </button>
            <button className="text-sm md:text-base bg-neutral-800 rounded-lg text-white px-3 py-1">
              {quantity}
            </button>
            <button
              onClick={() => incItemQuantity(phone?.id)}
              className="md:text-lg text-neutral-800 rounded-xl px-2 cursor-pointer border hover:text-white hover:bg-neutral-800 "
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Phone;
