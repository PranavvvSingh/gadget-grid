import { useMobileCartContext } from "@/context/ExportContext";
import Card from "./Card";

const Favorites = () => {
  const { favorites } = useMobileCartContext();
  return (
    <div className="w-5/6 mx-auto">
      <h1 className="text-xl text-center text-neutral-600 mt-5 mb-5">Checkout out your favorite phones...</h1>
      <div className="flex flex-wrap justify-evenly gap-x-5 gap-y-10 w-5/6 mx-auto">
        {favorites.map((phone) => (
          <Card
            key={phone.id}
            id={phone.id}
            name={phone.name}
            price={phone.price}
            rating={phone.rating}
            image={phone.image}
            remainingUnits={phone.remainingUnits}
          />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
