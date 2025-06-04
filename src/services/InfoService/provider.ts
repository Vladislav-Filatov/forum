import axios from "axios";
import { URL_BY_LETTER } from "@/constants";

export const getByName = async() => {
  const data = await axios.get(URL_BY_LETTER);

  return data;
}