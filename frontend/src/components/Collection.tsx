import { phoneType } from "../types/types";
import axios from "axios";
import Card from "./Card";
import { useMobileCartContext } from "@/context/ExportContext";
import Filters from "./Filters";
import { useState } from "react";

type responseType = {
  data: phoneType[];
};
type paramsType = {
  minPrice?: string;
  maxPrice?: string;
  memory?: string;
  os?: string;
  sort?: string;
  search?: string
};

const Collection = () => {
  const { price, memory, os, sort, search } = useMobileCartContext();
  const [phones, setPhones] = useState<phoneType[]>([]);

  const params: paramsType = {};
  if(search){
    params.search=search;
  }
  if (price != "Price") {
    const [minPrice, maxPrice] = price.split("-");
    params.minPrice = minPrice;
    params.maxPrice = maxPrice;
  }
  if (memory != "Memory") {
    params.memory = memory;
  }
  if (os != "OS") params.os = os;
  if (sort != "Sort By") {
    if (sort == "Low to High") params.sort = "asc";
    else if (sort == "High to Low") params.sort = "dsc";
  }
  const fetchData = async () => {
    const { data }: responseType = await axios.get(
      "http://localhost:3000/products",
      { params }
    );
    setPhones(data);
  };
  fetchData();

  return (
    <div className="w-11/12 md:w-5/6 mx-auto">
      <Filters/>
      <div className="flex flex-wrap justify-evenly gap-x-4 gap-y-5 md:gap-x-5 md:gap-y-10 w-5/6 mx-auto">
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
