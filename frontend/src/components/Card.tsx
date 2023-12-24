import { FaDollarSign } from "react-icons/fa6";
import { Rating } from "react-simple-star-rating";
import { FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useMobileCartContext } from "@/context/ExportContext";
import { cardType } from "@/types/types";

const Card = ({ id, name, price, rating, remainingUnits, image }: cardType) => {
  const { favorites, addToFav, removeFromFav, getItemQuantity, incItemQuantity, decItemQuantity } =
    useMobileCartContext();
  const navigate = useNavigate();
  const favStatus = favorites.some((item: cardType) => item.id == id);
  function toggleFavorite() {
    if (favStatus) removeFromFav(id);
    else addToFav({ id, name, price, rating, remainingUnits, image });
  }
  const quantity = getItemQuantity(id);
  return (
    <div className="relative flex flex-col gap-y-1 justify-between h-[280px] md:h-auto  w-[140px] md:w-[250px]">
      <img
        src={image}
        alt=""
        className="w-[140px] h-[140px] md:w-[230px] md:h-[230px] mx-auto cursor-pointer"
        onClick={() => navigate("/product/" + id)}
      />
      <FaHeart
        onClick={toggleFavorite}
        className={`cursor-pointer absolute top-1 right-1 text-lg  ${
          favStatus ? " text-amber-400 " : " text-neutral-300 "
        }`}
      />
      {remainingUnits < 15 && (
        <p className="absolute top-0 left-0 bg-red-600 text-white rounded-r-full px-1 text-sm animate-pulse">
          Few Left!
        </p>
      )}
      <h2
        className="text-center md:text-lg cursor-pointer text-pretty"
        onClick={() => navigate("/product/" + id)}
      >
        {name}
      </h2>
      <div className="flex flex-wrap justify-center md:flex-nowrap md:justify-between">
        <p className="flex items-center">
          <FaDollarSign />
          {price}
        </p>
        <Rating
          allowFraction
          size={20}
          initialValue={rating}
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
      {quantity === 0 ? (
        <button
          onClick={() => incItemQuantity(id)}
          className={`cursor-pointer border border-black rounded-full mt-2 hover:text-white hover:bg-neutral-800 z-20`}
        >
          Add to Cart
        </button>
      ) : (
        <div className="flex justify-around mt-2">
          <button
            onClick={() => decItemQuantity(id)}
            className="md:text-lg text-neutral-800 rounded-xl px-2 cursor-pointer border hover:text-white hover:bg-neutral-800 "
          >
            -
          </button>
          <button className="bg-neutral-800 rounded-lg text-white px-2">
            {quantity}
          </button>
          <button
            onClick={() => incItemQuantity(id)}
            className="md:text-lg text-neutral-800 rounded-xl px-2 cursor-pointer border hover:text-white hover:bg-neutral-800 "
          >
            +
          </button>
        </div>
      )}
    </div>
  );
};

export default Card;
