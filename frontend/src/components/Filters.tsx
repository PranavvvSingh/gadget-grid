import { useMobileCartContext } from "@/context/ExportContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const priceRanges = ["Price", "0-500", "500-700", "700-900", "900-1000", "1000+"];
const memoryRanges = ["Memory", "32" , "64", "128", "256", "512"]
const osRanges = ["OS","Android","MIUI","OxygenOS","iOS","ROG","Realme","One UI"]
const sortRanges = ["Sort By","Low to High", "High to Low"]


const Filters = () => {
  const {price, setPrice, memory, setMemory, os, setOs, sort, setSort, setSearch} = useMobileCartContext()
  const handleClick=()=>{
    setPrice("Price")
    setMemory("Memory")
    setOs("OS")
    setSort("Sort By")
    setSearch("")
  }
  return (
    <div className="flex flex-wrap justify-between items-center mt-10 mb-8 ">
      <div className="grid grid-cols-4 justify-items-center w-full lg:w-fit lg:flex justify-center items-center gap-2">
        <p>Filters:</p>

        <Select value={price} onValueChange={setPrice}>
          <SelectTrigger className="w-fit lg:w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {priceRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range !== "Price" ? "$" : ""}
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={memory} onValueChange={setMemory}>
          <SelectTrigger className="w-fit  lg:w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {memoryRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range} {range !== "Memory" ? "GB" : ""}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={os} onValueChange={setOs}>
          <SelectTrigger className="w-fit  lg:w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {osRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full lg:w-fit justify-center lg:justify-between items-center gap-5 lg:gap-10 mt-3 lg:mt-0">
        <Select defaultValue={sort} onValueChange={setSort}>
          <SelectTrigger className="w-fit lg:w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortRanges.map((range) => (
              <SelectItem key={range} value={range}>
                {range !== "Sort By" ? "Price:" : ""} {range}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <button
          onClick={handleClick}
          className="text-neutral-500 p-1 md:p-2 rounded-full border shadow-lg"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default Filters;
