import { useMobileCartContext } from "@/context/ExportContext";
import { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const { search, setSearch } = useMobileCartContext();
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSearch(searchText);
  }
  useEffect(()=>{
    setSearchText(search)
  },[search])
  return (
    <form
      className="flex rounded-full py-1 px-2 w-[300px] border border-white"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="w-full px-2 bg-transparent outline-none rounded-s-full text-white text-base"
      />
      <IoIosSearch className="ml-1 text-2xl md:text-3xl text-neutral-600" />
    </form>
  );
};

export default Search;
