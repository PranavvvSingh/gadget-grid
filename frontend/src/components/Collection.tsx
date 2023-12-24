import { phoneType } from "../types/types";
import axios from "axios";
import Card from "./Card";
import { useMobileCartContext } from "@/context/ExportContext";
import Filters from "./Filters";
import { useEffect, useMemo, useState } from "react";

type responseType = {
  data: phoneType[];
};
type paramsType = {
  minPrice?: string;
  maxPrice?: string;
  memory?: string;
  os?: string;
  sort?: string;
  search?: string;
};

const Collection = () => {
  const { price, memory, os, sort, search } = useMobileCartContext();
  const [phones, setPhones] = useState<phoneType[]>([]);

  const params = useMemo(() => {
    const paramsObj: paramsType = {};

    if (search) {
      paramsObj.search = search;
    }
    if (price !== "Price") {
      const [minPrice, maxPrice] = price.split("-");
      paramsObj.minPrice = minPrice;
      paramsObj.maxPrice = maxPrice;
    }
    if (memory !== "Memory") {
      paramsObj.memory = memory;
    }
    if (os !== "OS") {
      paramsObj.os = os;
    }
    if (sort !== "Sort By") {
      if (sort === "Low to High") {
        paramsObj.sort = "asc";
      } else if (sort === "High to Low") {
        paramsObj.sort = "dsc";
      }
    }

    return paramsObj;
  }, [search, price, memory, os, sort]);

  useEffect(() => {
    const fetchData = async () => {
      const { data }: responseType = await axios.get(
        "https://gadgetsapi-xkx9.onrender.com/products",
        { params }
      );
      setPhones(data);
    };
    fetchData();
  }, [params]);

  return (
    <div className="w-11/12 md:w-5/6 mx-auto">
      <Filters />
      <div className="flex flex-wrap justify-evenly gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-10  mx-auto">
        {phones.map((phone) => (
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

export default Collection;
