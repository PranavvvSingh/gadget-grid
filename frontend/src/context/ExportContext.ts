import { useContext } from "react";
import { MobileCartContext } from "./MobileContext";

export function useMobileCartContext() {
  return useContext(MobileCartContext);
}
